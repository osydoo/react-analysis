export function updateContainer(
    element: ReactNodeList,
    container: OpaqueRoot,
    parentComponent: ?React$Component<any, any>,
    callback: ?Function,
  ): Lane {
    // root fiber node
    const current = container.current;
    // fiber의 mode를 통해 Lane을 가져옵니다.
    const lane = requestUpdateLane(current);
  
    // 빌드의 성능 측정용
    if (enableSchedulingProfiler) {
      markRenderScheduled(lane);
    }
  
    // node.(tag === HostRoot).stateNode.context
    const context = getContextForSubtree(parentComponent);
    // context가 없다면 넣어주고, 있다면 pendingContext에 추가
    if (container.context === null) {
      container.context = context;
    } else {
      container.pendingContext = context;
    }

    // 상태 업데이트를 스케줄링합니다.
    const update = createUpdate(lane);
    // Caution: React DevTools currently depends on this property
    // being called "element".
    // 업데이트와 관련된 데이터 ex.setState의 새로운 상태값
    update.payload = {element};
  
    callback = callback === undefined ? null : callback;
    if (callback !== null) {
      update.callback = callback;
    }
  
    // current에 update 객체를 lane 우선순위에 따라 설정합니다. 
    const root = enqueueUpdate(current, update, lane);
    if (root !== null) {
      scheduleUpdateOnFiber(root, current, lane);
      entangleTransitions(root, current, lane);
    }
  
    return lane;
  }
  

  /**
   * 부모 컴포넌트로부터 자식 컴포넌트로 context를 전달
   * @param {*} parentComponent 
   * @returns 
   */
  function getContextForSubtree(
    parentComponent: ?React$Component<any, any>,
  ): Object {
    if (!parentComponent) {
      return emptyContextObject;
    }
  
    // key._reactInternals
    const fiber = getInstance(parentComponent);
    // context가 정상적으로 붙어있는지 확인 -> 정상이라면 HostRoot.stateNode.context 리턴
    const parentContext = findCurrentUnmaskedContext(fiber);
  
    if (fiber.tag === ClassComponent) {
      const Component = fiber.type;
      if (isLegacyContextProvider(Component)) {
        return processChildContext(fiber, Component, parentContext);
      }
    }
  
    return parentContext;
  }