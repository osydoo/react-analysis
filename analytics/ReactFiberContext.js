/**
 * unmasked 컨텐스트를 찾습니다. 즉 특정 컴포넌트 하위에서 변경되지 않고, 원본 그대로 유지되는 컨텍스트를 의미합니다.
 * rendering subtree나 container내에서 특정 컴포넌트의 컨텍스트를 찾아내기 위해 사용합니다.
 * 즉 정상적으로 컴포넌트가 붙어있는지 확인하고, 아니라면 에러를 뱉습니다.
 * @param {*} fiber 
 * @returns 
 */
function findCurrentUnmaskedContext(fiber: Fiber): Object {
    if (disableLegacyContext) {
      return emptyContextObject;
    } else {
      // Currently this is only used with renderSubtreeIntoContainer; not sure if it
      // makes sense elsewhere
      if (!isFiberMounted(fiber) || fiber.tag !== ClassComponent) {
        throw new Error(
          'Expected subtree parent to be a mounted class component. ' +
            'This error is likely caused by a bug in React. Please file an issue.',
        );
      }
  
      let node: Fiber = fiber;

      do {
        switch (node.tag) {
            // 부모가 HostRoot일 때, 노드의 context를 return 합니다.
            // 즉 가장 상위에 위치하는 노드 타입입니다.
          case HostRoot:
            return node.stateNode.context;
            // class component일 시 context provider 확인 후 자식 컨텍스트를 반환합니다.
          case ClassComponent: {
            const Component = node.type;
            if (isContextProvider(Component)) {
              return node.stateNode.__reactInternalMemoizedMergedChildContext;
            }
            break;
          }
        }

        // 부모노드를 따라올라갑니다.
        node = node.return;
      } while (node !== null);
  
      throw new Error(
        'Found unexpected detached subtree parent. ' +
          'This error is likely caused by a bug in React. Please file an issue.',
      );
    }
  }