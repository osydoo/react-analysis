// packages\react-dom\client.js
import {ConcurrentRoot} from 'react-reconciler/src/ReactRootTags';
import {
    createContainer,
    createHydrationContainer,
    updateContainer,
    findHostInstanceWithNoPortals,
    flushSync,
    isAlreadyRendering,
} from 'react-reconciler/src/ReactFiberReconciler';
import type {
    Fiber,
    FiberRoot,
    SuspenseHydrationCallbacks,
    TransitionTracingCallbacks,
} from '/react-reconciler/src/ReactInternalTypes';
import {
    NoLane,
    NoLanes,
    NoTimestamp,
    TotalLanes,
    createLaneMap,
} from '/react-reconciler/src/ReactFiberLane';
import { NoFlags } from '../packages/react-reconciler/src/ReactFiberFlags';
import { getHighestPriorityLane } from '../packages/react-reconciler/src/ReactFiberLane';

/**
 * 참고 :
 * arguments에 [변수] = [변수] = 1라면 상위 함수에서 로컬이나 global로 생겨난 변수임
 * = 값? 이라면 null이 가능임
 * [변수] = [변수]는 할당이 그대로 이루어진 변수임
 *  주성 조건문 한줄마다 
 * [변수] = [변수] = 1! 같이 !가 붙어있다면 상수임
 * [변수] = [변수] = 1값에 | 이 붙어있다면 전자는 createRoot, 후자는 hydrateRoot임
 * 
 * 주석이 property 상단에 붙어있다면 아래 모든 property에게 적용되는 것임
 * 또한 해당 주석이 하단에 재사용된다면 해당 변수들을 의미
 * 
 * 주석이 옆에 붙어있다면 상위 함수에서 생성된 값임
 * : [타입], 설명 
 * :, 이 없다면 부모의 부모에게서 받은 것
 * 
 * @name name[] 상황에 따라 다음으로 실행 할 로직입니다.
 */

// ReactDOM.js
const createRoot.arguments = {
    container, //: Element | Document | DocumentFragment, querySelector('root')
    options?: //: CreateRootOptions,
}
const hydrateRoot.arguments = {
    ...createRoot.arguments,
    initialChildren, //: ReactNodeList,
}

// ReactFiberReconciler.js
const createContainer.arguments = {
    containerInfo, // createRoot.args.container
    tag = ConcurrentRoot = 1!, //: RootTag, lagecy = 0
    hydrationCallbacks = null, //: SuspenseHydrationCallbacks?,
    /** createRoot.args.options.createContainer */ 
    isStrictMode, //: Boolean,
    concurrentUpdatesByDefaultOverride// : ?Boolean,
    /** TODO: Host의 구성이지만, root 생성자에서 전달해야하는데 이는 단일 유형으로 바꿔줄 예정 */
    identifierPrefix, //: String,
    onRecoverableError, //: Function?,
    transitionCallbacks, //: TransitionTracingCallbacks?, transition and marker [start, progress, complete, incompelete] 
    /** ----------------------- */
    /** ----------------------- */
}
const createHydrateContainer.arguments = {
    ...createContainer.arguments,
    hydrationCallbacks, //: SuspenseHydrationCallbacks?, hydrateRoot.args.options
    initialChildren,  // hydrateRoot.args.initialchildren
    callback = null, //: Function?, TODO: 레거시 모드가 삭제되면 사라질 변수
}
const getContextForSubtree.arguemnts = {
    parentComponent: null //: ?React$Component<any, any>
}

// ReactFiberRoot.js
const createFiberRoot.arguments = {
    containerInfo, // createRoot.args.container
    tag, //createContainer.args.tag = 1
    initialChildren, // hydrateRoot.args.initialChildren, creatRoot is null
    hydrate, //: Boolean,
    hydrationCallbacks, //:, createHydrateContainer.args.hydrationCallbacks
    /** createRoot.args.options.createContainer */ 
    /** ----------------------- */
}

// ReactFilber.js
const createHostRootFiber.arguments = {
    tag, // createContainer.args.tag = 1
    isStrictMode, // createContainer.args.isStrictMode
    concurrentUpdatesByDefaultOverride, // createContainer.args.concurrentUpdatesByDefaultOverride
}
const createFiber.arguments = {
    tag: HostRoot = 3!, //: WorkTag, Root of host tree 
    pendingProps: null, //: mixed 
    key: null, //: string? 
    mode: mode //: TypeOfMode,
}
const retainCache.arguments = {
    cache: initialCache, //: Cache
}
const initializeUpdateQueue.arguments = {
    fiber: uninitialized
}

// ReactFiberClassUpdateQueue.js
const enqueueUpdate.arguemnts = {
    fiber, //: Fiber, createHostRootFiber()
    update, //: Update<State>, updateQueue(lane)
    lane //: Lane, requestUpdateLane(createHostRootFiber())
}

const enqueueConcurrentClassUpdate.arguments = {
    fiber, //: Fiber, enqueueUpdate.arguemnts.fiber,
    sharedQueue, //: SharedQueue<State>, createHostRootFiber().initializeUpdateQueue().shared
    update, //: Update<State>:, enqueueUpdate.arguemnts.update,
    lane //: enqueueUpdate.arguments.lane
}

/**
 * 실제 함수 동작
 */

function createRoot(container, options?): RootType {
    let isStrictMode = options.untable_strictMode;
    let concurrentUpdatesByDefaultOverride = allowConcurrentByDefault && options.unstable_concurrentUpdatesByDefault;
    let transitionCallbacks = options.unstable_transitionCallbacks;
    // 한 페이지에 root가 여러개 일때 root를 구분하는 용도
    let identifierPrefix = options.identifierPrefix;
    // 리엑트에 에러 발생시 실행 함수
    let onRecoverableError = options.onRecoverableError;


    /**
     *  createContainer(){ : createFiberRoot를 하기전 hydrate와 구분하기 위한 초기화
     *      createFiberRoot(){
     *          new FiberRootNode(container, 1, hydrate, indentifierPrefix, onRecoverableError): (document.querySelector('root'), 1, false, '', null)
     *          createHostRootFiber()
     *          createFiber()
     *              new FiberNode(3, null, null, mode): (3, null, null, ) : uninitializedFiber에 넣어줌
     *          createCache()
     *              new AbortControllerLocal()
     *          retainCache()
     *          initializeUpdateQueue()
     *          return root
     *      }
     *  }
     */
    
    return root = {
        tag: ConcurrentRoot: 1,
        containerInfo,
        pendingChildren: null,
        current: null,
        pingCache: null,
        finishedWorkd: null,
        timeoutHandle: noTimeout = -1, // 테스트용 옵션
        cancelPendingCommit: null,
        context: null;
        pendingContext: null,
        next: null,
        callbackNode: null,
        callbackPrioirty: NoLanes = 0b0000000000000000000000000000000,
        expirationTimes: [-1].length(31),

        pendingLanes: NoLanes,
        suspendedLanes: NoLanes,
        pingedLanes: NoLanes,
        expiredLanes: NoLanes,
        finishedLanes: NoLanes,
        errorRecoveryDisabledLanes: NoLanes,
        shellSuspendCounter: 0,

        entangledLanes: NoLanes,
        entanglements: [NoLanes].length(31),

        hiddenUpdates: [null].length(31),

        identifierPrefix,
        onRecoverableError,

        /** 
         * new FiberRootNode: if endableCache = true! 
        */
        pooledCache: null,
        pooledCacheLanes: NoLanes,
        
        /** 
         * 특징 : 동작안하는데, 아직 삭제 못 함 Transition Tracing proposal로 대체 예정
         * 용도 : suspense에 콜백 property를 추가해 업데이트 queue에 어떤 promise가 있는지 알려 사용자에게 로딩을 보여줍니다.
        */
        hydrationCallbacks: null, // new FiberRootNode: if endableSuspenseCallback = false!
        this.hydrationCallbacks: hydrationCallbacks, // createFiberRoot(): if enableSuspenseCallback = false! 

        incomplateTransitions: new Map(),

        /** 
         * new FiberRootNode: if enableTransitionTracing = false!,  
        */
        transitioncallbacks: null,
        transitionLanesMap: [null].length(31),

        /** 
         * __Profile__ = false!
         * new FiberRootNode: if enableProfilerTimer = __Profile__ && enableProfilerCommiHooks = __Profile__ 
        */
        effectDuration: 0,
        passiveEffectDuration: 0,

        /** 
         * new FiberRootNode: if enableUpdaterTracking = __Profile__ 
        */
        memoizedUpdater: new Set(),
        pendingUpdatersLaneMap: [new Set()].length(31),

        // hydrate는 __DEV__에서만 사용

        /**
         * createHostRootFiber()
         */
        this.current = { //: Fiber,
            // instance
            tag: HostRoot = 3,
            key: key,
            elementType: null,
            type: null,
            stateNode: null,
    
            // Fiber
            return: null,
            child: null,
            sibling: null,
            index: 0,
    
            ref: null,
            refCleanup: null,
    
            pendingProps: pendingProps = null,
            memoizedProps: null,
            updateQueue: null,
            memoizedState: null,
            dependencies: null,
    
            mode: 0b0000000, // tag === 1
            this.mode: this.mode |= 0b0000001, // ConcurrentMode
            this.mode: this.mode |= 0b0011000, // isStrictMode || createRootStrictEffectsByDefault, strictEffectsMode 여부 - 없앨 예정인 사항
            this.mode: this.mode |= 0b0000010, // enableProfilerTimer && isDevToolsPresent, Devtools 이 돌때 항상 수집하기
            
            // Effects
            flag: NoFlags = 0b0000000000000000000000000000,
            subtreeFlags: NoFlags,
            deletions: null,
    
            lanes: NoLanes = 0b0000000000000000000000000000000,
            childLanes: NoLanes,
    
            alternate: null,
    
            /** 
             * new FiberNode: if enableProfilerTimer = __PROFILE__ = false
             * Object.preventExtension를 사용하면 DEV 모드에 성능상 영향을 기칩니다. 이땐 아래를 double로 사용해보세요.
            */
            actualDuration: Number.NaN = 0,
            actualStartTime: Number.NaN = -1,
            selfBaseDuration: Number.NaN = 0,
            treeBaseDuration: Number.NaN = 0,

            /**
             * createFiberRoot()
             * 순환구조로 되어있다.
             */
            this.stateNode = root,

            this.memoizedState = { //: RootState,
                element: initialChildren,
                isDehydrated: hydrate,
                cache: { //: Cache, if enableCache = true; else (null); // not enabled yet
                    controller: typeof AbortController !== 'undefined' ? { //: AbortController, new AbortControllerLocal()
                            signal: { //: AbortSignal?, JS 객체로 비동기 작업을 중단할 때 사용
                                aborted, //: Boolean
                                reason, //: any
                                onabort, //:(this: ArbortSignal, event) => any
                                throwIfAborted()
                            },
                            abort(reason)
                        } : { // test와 같이 AbortController가 없는 환경에서 라이트 버전 사용
                            listeners: [], //: listener[]
                            signal: {
                                aborted, //: boolean
                                addEventListener: () => { listeners.push(listener) }
                            }
                            abort: () => {
                                signal.aborted = true,
                                listeners.forEach(listener => listener())
                            }
                        }
                    data: new Map(),
                    refCount: 0, // new AbortControllerLocal()
                    this.refCount: this.refCount+1 // retainCache()
                }
            }

            /**
             * initializeUpdateQueue()
             * 순환구조로 되어있다.
             */
            this.updateQueue = { //: UpdateQueue<State>
                baseState: this.memoizedState, //: RootState
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: null,
                    lanes: NoLanes,
                    hiddenCallbacks: null,
                },
                callbacks: null
            }
        }
    }

    /**
     * TODO: 추후 작업...
     */
    markContainerAsRoot(root.current, container);
    Dispatcher.current = ReactDOMClientDispatcher;
  
    const rootContainerElement: Document | Element | DocumentFragment =
      container.nodeType === COMMENT_NODE
        ? (container.parentNode: any)
        : container;
    listenToAllSupportedEvents(rootContainerElement);
  
    // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
    return new ReactDOMRoot(root);
}

// createRoot와 다른점만 기입
function hydrateRoot(container, initialChildren, options?): RootType {
    /**
     * @name hydrateRoot[x].createHydrationContainer
     * [기능] rootNode를 만들고, 현재 작업중인 Lane들을 root에 할당하고, 작업 queue에 넣습니다.
     */
    const root = (function createHydrationContainer(...createHydrationContainer.arguments){

        const hydrationCallbacks = options != null ? options : null;
        // 6 ~ 12
        // createHydrationContainer() : root에 update.lane과 context 추가
    
        /**
         *  createHydrationContainer(){ : createFiberRoot를 하기전 구분하기 위한 초기화
         *      createFiberRoot(){
         *          new FiberRootNode(container, 1, hydrate, indentifierPrefix, onRecoverableError): (document.querySelector('root'), 1, false, '', null)
         *          createHostRootFiber()
         *          createFiber()
         *              new FiberNode(3, null, null, mode): (3, null, null, ) : uninitializedFiber에 넣어줌
         *          createCache()
         *              new AbortControllerLocal()
         *          retainCache()
         *          initializeUpdateQueue()
         *          return root
         *      }
         *      : createRoot와 다른점인데 초기 렌더링과 서버 렌더링을 맞추기위해 초기 렌더링을 예약합니다.
         *      getContextForSubtree()
         *      requestUpdateLane(fiber: createHostRootFiber())
         *       enqueueUpdate(createHostRootFiber(), update, lane)
         *  }
         */
    
        /**
         * @name createHydrationContainer[1]
         * createContainer와 일부 옵션을 제외하면 동일
         */
        {...(createContainer(){})()}

        /**
         * @name createHydrationContainer[2]
         * getContextForSubtree(parentComponent = null)
         *      if !!parentComponent return {}
         */
        this.context = {}

        /**
         * @name createHydrationContainer[3]
         * [변수] root.current = createHostRootFiber() = createFiber() = new FiberNode(HostRoot, ...)
         */
        const current = root.current;

        /**
         * @name createHydrationContainer[5].requestUpdateLane
         * [기능] fiber의 mode를 통해 Lane을 가져옵니다.
         * [변수] current = root.current = createHostRootFiber() = createFiber() = new FiberNode(HostRoot, ...)
         * @returns {Lane}
         */
        const lane = (function requestUpdateLane(current){
            /**
             * @name requestUpdateLane[1.1]
             * [기능] HostRootFiber의 mode가 ConcurrentMode가 포함되어있는지 체크합니다.
             * [변수] mode = ... = new FiberNode(HostRoot, ...).mode
             * [결과]
             *      [T] @requires requestUpdateLane[1.2]: HostRootFiber의 mode가 ConcurrentMode임
             *      [F] @returns {lane = SyncLane = 0b0000000000000000000000000000010}: NoLane인 경우에 레인을 조정해줍니다. 
             * [특징]
             *      1. createHostRootFiber()의 ProfileMode와 유사함, SyncLane은 transition까지 초기화
             */
            if((mode & ConcurrentMode) === NoMode){}

            /**
             * @name requestUpdateLane[1.2]
             * 
             * [기능] Context의 동작이 Rendering 상태 && 현재 작업중인 Root가 Rendering중 일때 즉 현재 Root에서 Context가 렌더링에 사용되고 있을 때
             * [결과] 
             *      [T] @requires requestUpdateLane[1.3]: 현재 Root에서 렌더링에 사용중인 Context가 없음
             *      [F] @requires requestUpdateLane[1.2-1]: 사용중인 Context가 있습니다.
             */
            else if ((executionContext & RenderContext) !== NoContext && workInProgressRootRenderLanes !== NoLanes){
                /**
                 * @name requestUpdateLane[1.2-1].pickArbitraryLane
                 * [기능] 우선 순위 레벨 중에서 어떤 레벨을 선택해도 상관없는 상황에 사용
                 * [적용 이유] setState같은걸 바로 동작시키려고 하는데, 공식 지원 동작은 아니고 임시방편임
                 * @requires pickArbitraryLane[1]
                 */
                (function pickArbitraryLane(workInProgressRootRenderLanes){
                    /**
                     * @name pickArbitraryLane[1].getHighestPriorityLane
                     * [기능] ???
                     * [변수] lane = workInProgressRootRenderLanes
                     * [적용 이유] 가장 빠른 연산이라 사용
                     * @returns {lane = workInProgressRootRenderLanes & -workInProgressRootRenderLanes}
                     */
                    (getHighestPriorityLane(lane){})()
                })()
            }

            /**
             * @name requestUpdateLane[1.3]
             * [기능] ReactCurrentBatch에 transition이 존재하는지 확인
             * [변수] 
             *      1. requestCurrentTransition() !== null 
             *      2. requestCurrentTransition() = ReactSharedInternals.ReactCurrentBatchConfig.transition
             * [결과]
             *      [T] @requires requestUpdateLane[1.3-1]: transition is null 
             *      [F] @requires requestUpdateLane[1.4]
             */
            if(isTransition){
                /**
                 * @name requestUpdateLane[1.3-1.1]
                 * [기능] currentEntangled에 있는 async action scope를 사용할지 여부를 결정합니다.
                 * [변수] 
                 *      1. actionScopeLane = peekEntangledActionLane() = currentEntangledLane
                 *          [기능] entangled scope에서 모든 업데이트를 위해 공유되는 Lane
                 * [결과]
                 *      [T] @return {lane = currentEntangledLane}: entangled scope에 transition이 존재합니다.
                 *      [F] @requires requestUpdateLane[1.3-1.2]
                 * [__DEV__] transition._updatedFibers에 createHostRootfiber를 넣어주는 작업이 추가된다.
                */
                if(actionScopeLane !== NoLane){}
                /**
                 * @name requestUpdateLane[1.3-1.2].requestTransitionLane
                 * [적용 이유] 처음 업데이트에는 해당 사항이 없으니, 신규 transition Lane을 가져옵니다.
                 * [기능] 같은 evnet내에선 같은 prioirty가 되어야 하기 때문에 claimNextTransitionLane()를 통해 Lane을 지정해주고, 가져옵니다.
                 */
                (function requestTransitionLane(){
                    /**
                     * @name requestTransitionLane[1.1]
                     * [기능] 현재 Event Transition을 리턴합니다.
                     * [결과]
                     *      [T] @return {lane = currentEventTransitionLane}: 현재 event transition 존재
                     *      [F] @requires requestTransitionLane[1-2] as claimNextTransitionLane[1]
                     */
                    if(currentEventTransitionLane === NoLane){
                        /**
                         * @name requestTransitionLane[1.1].claimNextTransitionLane
                         * [기능] 모든 transition에게 고유한 priority를 부여합니다.
                         * [적용 이유] 같은 이벤트내에선 같은 우선순위를 가져야하기 때문에 이를 조정하기 위해서 사용합니다.
                         * [로직] 
                         *      1. nextTransition의 초기 값은 TransitionLane1
                         *      2. 함수 실행시 TransitionLane[N]을 return하고, nextTransition을 TransitionLane[N+1]로 만듦
                         *      3. TransitionLane의 [N]은 16까지 높아졌다가 다시 Transition1이 되고 2번의 작업을 반복
                         *      4. 조건문에서 비교연산을 nextTransitionLane & TransitionLanes 이렇게 하기때문에 Lane은 transition영역만 변하게됨
                         * @return {lane = TransitionLane1}
                         */
                        (function claimNextTransitionLane(){})()
                    }
                })()
            }

            /**
             * @name requestUpdateLane[1.4]
             * [기능] flushSync와 같은 일부 method들은 priority를 context 변수를 추적해서 지정해주기 때문에 이를 통해 불러옴
             * [변수] updateLane = getCurrentUpdatePrioirty() = currentUpdatePriority
             * [결과]
             *      [T] @requires requestUpdateLane[1.5]: currentUpdatePriority is NoLane
             *      [F] @returns {lane = currentUpdatePriority}: currentUpdatePriority: currentUpdatePriority not NoLane
             */
            if(updateLane !== NoLane){}

            /**
             * @name requestUpdateLane[1.5]
             * [기능] React 외부에서 날아온 event prioirty를 불러옴
             * [변수] eventLane = getCurrentEventPriority()
             * [결과] @returns {lane = eventLane}: 어디서 호출되냐에 따라 다른 Event를 전달 ex.window.event.type
             *      
             */
            else{}
        })()

        /**
         * @name createHydrationContainer[6].createUpdate
         * [기능] update 초기 객체를 가져옵니다.
         * [변수] lane = @name createHydrationContainer[5].requestUpdateLane
         */
        const update = (function createUpdate(lane){})() = {
            lane, 
            tag: UpdateState = 0, 
            payload: null, 
            callback: null, 
            next: null, 
            /**
             * @name createHydrationContainer[7]
             * [기능] 초기화
             */
            this.callback = callback | null
        }

        /**
         * @name createHydrationContainer[8].enqueueUpdate
         * [기능] update Queue에 넣기
         * [변수]
         *      1. current = ... = new FiberNode(HostRoot, ...)
         *      2. update = @name createHydrationContainer[6].createUpdate
         *      3. lane = @name createHydrationContainer[5].requestUpdateLane
         * [__DEV__] update(setState, replaceState...)를 중첩해서 사용하면 에러를 발생시킵니다.
         */
        (function enqueueUpdate(current, update, lane){

            /**
             * @name enqueueUpdate[1]
             * [기능] fiber가 unmounted되었을때만 작동한다.
             * [변수] updateQueue = ... = new FiberNode(HostRoot, ...).updateQueue
             * [결과]
             *      [T] @returns {null}
             *      [F] @requires enqueueUpdate[2] : createHostRootFiber().initializeUpdateQueue()가 존재한다.
             */
            if(updateQueue === null){}

            /**
             * @name enqueueUpdate[2.1]
             * [기능] classRender를 사용하면 발생한다.
             * [결과]
             *      [T] @requires unsafe_markUpdateLaneFromFiberToRoot : class까지 보기엔 너무 범위가 넓어지니 건너뛰었다.
             *      [F] @requires enqueueUpdate[3]
             */
            if (isUnsafeClassRenderPhaseUpdate(fiber)) {}

            /**
             * @name enqueueUpdate[2.2].enqueueConcurrentClassUpdate
             * [기능] concurrent class update 넣기
             * [변수]
             *      1. fiber = ... = new FiberNode(HostRoot, ...)
             *      2. sharedQueue = ... = new FiberNode(HostRoot, ...).updateQueue.sharedQueue
             *      3. update = @name createHydrationContainer[7]
             *      4. lane = @name createHydrationContainer[5].requestUpdateLane
             * [결과] @requires : return이 존재하지만 받는곳이 없어 함수 실행만을 위한 곳입니다.
             */
            (function enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane){

                /**
                 * @name enqueueConcurrentClassUpdate[1].enqueueUpdate
                 * [기능] concurrentQeueus에 작업을 넙어주고, concurrentlyUpdatedLanes, fiber.lane, alternate.lane과 lane을 합쳐 업데이트해줍니다.
                 * [변수]
                 *      1. fiber = ... = new FiberNode(HostRoot, ...)
                 *      2. concurrentQueue = sharedQueue = ... new FiberNode(HostRoot, ...).updateQueue.sharedQueue
                 *      3. concurrentUpdate = update = @name createHydrationContainer[7]
                 *      4. lane = @name createHydrationContainer[5].requestUpdateLane
                 */
                (function enqueueUpdate(fiber, concurrentQueue, concurrentUpdate, lane){

                    /**
                     * @name enqueueUpdate[1]
                     * [기능] concurrentQueue에 작업을 넣어줍니다.
                     * [변수] 
                     *      1. contrconcurrentQueues = @global ReactFiberConcurrentUpdates: queueing이 진행되면 null로 초기화 됩니다.
                     *      2. concurrentQueuesIndex @global ReactFiberConcurrentUpdates: queuing이 끝나면 0으로 초기화됩니다.
                     *      3. fiber = ... = new FiberNode(HostRoot, ...)
                     *      4. queue = ... new FiberNode(HostRoot, ...).updateQueue.sharedQueue
                     *      5. update = @name createHydrationContainer[7]
                     *      6. lane = @name createHydrationContainer[5].requestUpdateLane
                     */
                    concurrentQueues[concurrentQueuesIndex++] = fiber;
                    concurrentQueues[concurrentQueuesIndex++] = queue;
                    concurrentQueues[concurrentQueuesIndex++] = update;
                    concurrentQueues[concurrentQueuesIndex++] = lane;

                    /**
                     * @name enqueueUpdate[2]
                     * [기능] 기존 작업Lane과 신규로 들어온 lane을 합쳐 다시 할당합니다.
                     * [변수] 
                     *      1. concurrentlyUpdatedLanes @global ReactFiberConcurrentUpdates: queueing이 끝나면 NoLanes으로 초기화됩니다.
                     *      2. lane = @name createHydrationContainer[5].requestUpdateLane
                     */
                    concurrentlyUpdatedLanes = mergeLanes(concurrentlyUpdatedLanes, lane);

                    /**
                     * @name enqueueUpdate[3]
                     * [기능] fiber의 lanes과 신규로 들어온 lane을 합쳐 fiber에 다시 할당합니다.
                     * [변수]
                     *      1. fiber = ... = new FiberNode(HostRoot, ...).lane
                     *      2. lane = @name createHydrationContainer[5].requestUpdateLane
                     * [결과] new FiberNode(HostRoot, ...)의 lanes에 현재 작업 추가를 통해 형상을 맞춤
                     * [특징] shared queue에서 작업되어야 하기 때문에 이동시킬 예정입니다.
                     */
                    fiber.lanes = mergeLanes(fiber.lanes, lane);

                    /**
                     * @name enqueueUpdate[4]
                     * [기능] alernate가 존재하는지여부를 파악합니다.
                     * [변수] alternate = new FiberNode(HostRoot, ...).alternate = null
                     */
                    if (alternate !== null) {
                        /**
                         * @name enqueueUpdate[4-1]
                        * [기능] fiber의 alternate.lanes과 신규로 들어온 lane을 합쳐 alternate.lanes에 다시 할당합니다.
                        * [변수]
                        *      1. alternate = new FiberNode(HostRoot, ...).alternate = null
                        *      2. lane = @name createHydrationContainer[5].requestUpdateLane
                        * [결과] new FiberNode(HostRoot, ...)의 lanes에 현재 작업 추가를 통해 형상을 맞춤
                         */
                        alternate.lanes = mergeLanes(alternate.lanes, lane);
                    }
                })()

                /**
                 * @name enqueueConcurrentClassUpdate[2].getRootForUpdatedFiber
                 * [기능] unMounted된 곳에 update가 있는지 확인하고, root가 HostRoot라면 return해줍니다.
                 * [변수] sourceFiber = fiber = ... = new FiberNode(HostRoot, ...)
                 * [특징] createRoot에서는 unmounted 탐지외에는 의미 없는 동작들입니다.
                 */
                (function getRootForUpdatedFiber(sourceFiber){

                    /**
                     * @name getRootForUpdatedFiber[1].throwIfInfiniteUpdateLoopDetected
                     * [기능] 무한루프 탐지
                     * [특징] 
                     *      1. 동작할 일 없는 코드 
                     *      2. 추후에 탐지한다면 이것을 동작시킬 예정
                     */
                    (function throwIfInfiniteUpdateLoopDetected(){})()

                    /**
                     * @name getRootForUpdatedFiber[2].detectUpdateOnUnmountedFiber
                     * [기능] unmounted된 fiber에서 동작하는 update를 탐지합니다.
                     * [변수] sourceFiber = ... = new FiberNode(HostRoot, ...)
                     * [특징] 
                     *      1. setState 발생시 루트는 방드시 scheduled되어 있어야합니다. 
                     *      root를 찾기 위해서는 return을 따라 올라가는 방법 밖에 없는데, 
                     *      기존에는 childLanes 설정 중 이러한 동작을 했지만, 현재는 둘이 다른 시간에 동작합니다.
                     *      2. __DEV__에서만 동작합니다.
                     */
                    (function detectUpdateOnUnmountedFiber(sourceFiber, sourceFiber){})()

                    /**
                     * @name getRootForUpdatedFiber[3.n]
                     * [기능] root까지 역참조해서 올라가면서 unmountedFiber에 update가 있는지 확인하고, node에 root를 할당합니다.
                     * [변수]
                     *      1. node = sourceFiber = ... = new FiberNode(HostRoot, ...)
                     *      2. parent = node.return = ... = new FiberNode(HostRoot, ...).return
                     */
                    while (parent !== null) {

                        /**
                         * @name getRootForUpdatedFiber[3.n-1].detectUpdateOnUnmountedFiber
                         * [기능] unmounted된 fiber에서 동작하는 update를 탐지합니다.
                         * [변수] 
                         *      1. sourceFiber = ... = = new FiberNode(HostRoot, ...)
                         *      2. node = ... = new FiberNode(HostRoot, ...)
                         * [특징] @requires getRootForUpdatedFiber[2].detectUpdateOnUnmountedFiber
                         */
                        (function detectUpdateOnUnmountedFiber(sourceFiber, node){})()
                        /**
                         * @name getRootForUpdatedFiber[3.n-2]
                         * [기능] node에 parent를 parent에 parent.return을 할당합니다.
                         * [변수] 
                         *      1. node = sourceFiber = ... = new FiberNode(HostRoot, ...)
                         *      2. parent = node.return = ... = new FiberNode(HostRoot, ...).return
                         */
                        node = parent;
                        parent = node.return;
                    }

                    /**
                     * @name getRootForUpdatedFiber[4.1]
                     * [기능] root가 HostRoot인지 확인합니다.
                     * [변수]
                     *      1. node.tag = sourceFiber.tag = ... = new FiberNode(HostRoot, ...).tag = HostRoot = 3
                     *      2. HostRoot = 3
                     *      3. node.stateNode = root = new FiberRootNode()
                     * [결과]
                     *      [T] @returns {node.stateNode}: node.StatNode 즉 root를 반환합니다.
                     *      [F] @requires getRootForUpdatedFiber[4.2]
                     */
                    if(node.tag === HostRoot){}

                    /**
                     * @name getRootForUpdatedFiber[4.2]
                     * [결과] @returns {null}: HostRoot가 아니라면 null을 반환합니다.
                     */
                    else {}
                })()
            })() 
        })()

        /**
         * @name createHydrationContainer[9].scheduleInitialHydrationOnRoot
         * [기능] root에 작업을 할당하고, 중단된 transition을 활성화 시킨 뒤, microtask를 처리합니다.
         * [변수] 
         *      1. root: ... = new FiberRootNode()
         *      2. lane: @name createHydrationContainer[5].requestUpdateLane
         * [특징]  
         *      root의 init hydration을 위한 작업이고, 대부분의 작업은 생략됩니다.
         *      이를 따로 둔 이유는 초기 자식 요소를 이후 업데이트 요소와 구분해
         *      client 렌더링된 요소와 일치를 확인해기 위해서입니다.
         * 
         */
        (function scheduleInitialHydrationOnRoot(root, lane){
            
            /**
             * @name scheduleInitialHydrationOnRoot[1]
             * [기능] root의 current Node에 작업을 할당합니다.
             * [변수] 
             *      1. root: = ... = new FiberRootNode()
             *      2. root.current: = ... = new FiberNode(HostRoot)
             */
            root.current.lanes = lane;

            /**
             * @name scheduleInitialHydrationOnRoot[2].markRootUpdated
             * [기능] suspended된 transition을 다시 활성화시킵니다.
             * [변수]
             *      1. root: = ... = new FiberRootNode()
             *      2. updateLane: @name createHydrationContainer[5].requestUpdateLane
             */
            (function markRootUpdated(root, updateLane){

                /**
                 * @name markRootUpdated[1]
                 * [기능] root의 pendingLane에 updateLane을 추가합니다.
                 * [변수]
                 *      1. root.pendingLanes: = ... = new FiberRootNode()
                 *      2. updateLane: @name createHydrationContainer[5].requestUpdateLane
                 * [특징] createRoot에서 생성된 pendingLanes은 NoLane이므로 updateLane이 그대로 들어가게 됩니다.
                 */
                root.pendingLanes |= updateLane

                /**
                 * @name markRootUpdated[2.1]
                 * [기능] 현재 Lane이 idle 상태인지 확인합니다.
                 * [변수]
                 *      1. updateLane: @name createHydrationContainer[5].requestUpdateLane
                 *      2. idleLane: @constant {Lane} 우선순위가 낮은 동작은 나중에 동작시키기 위한 상태입니다.
                 * [결과]
                 *      [T] @requires markRootUpdated[2.1-1] : idle 상태가 아닙니다.
                 *      [F] @return {null}
                 */
                if (updateLane !== IdleLane) {

                    /**
                     * @name markRootUpdated[2.1-1]
                     * [기능] root의 중단되거나 표시된 lane을 초기화합니다.
                     * [변수]
                     *      1. root.suspendedLanes: ... = new FiberRootNode().suspendedLanes
                     *      2. root.pingedLanes: ... = new FiberRootNode().pingedLanes
                     * [특징] createRoot에선 모두 NoLanes상태입니다.
                     */
                    root.suspendedLanes = NoLanes;
                    root.pingedLanes = NoLanes;
                }
            })()

            /**
             * @name scheduleInitialHydrationOnRoot[3].ensureRootIsScheduled
             * [기능]
             *      1. root가 root schedule에 있는지 확인합니다.
             *      2. root schedule를 처리하기위해 대기중인 microtask가 있는지 확인합니다.
             * [변수] root: = ... = new FiberRootNode()
             * [특징]
             *      1. 루트가 업데이트 받을 때마다 수행합니다.
             *      2. 대부분의 scheduling 로직은 'scheduleTaskForRootDuringMicrotask'가 동작하기 전엔 동작하지 않습니다.
             */
            (function ensureRootIsScheduled(root){

                /**
                 * @name ensureRootIsScheduled[1.1]
                 * [기능] root가 가장 마지막에 작업한 root인지 확인합니다.
                 * [변수]
                 *      1. root: = ... = new FiberRootNode()
                 *      2. lastScheduledRoot: @constant {FiberRoot}: 대기중인 모든 작업을 연결하고 있으며, multi root때문에 복잡한 로직이 있습니다. singe root에서 최적화되어 있습니다.
                 *      3. root.next: new FiberRootNode().next : multiRoot에서 다음에 나오는 root입니다.
                 * [결과]
                 *      [T] @requires ensureRootIsScheduled[2] : singleRoot가 아니면서 가장 마지막에 작업한 루트입니다. 
                 *      [F] @requires ensureRootIsScheduled[1.2]
                 * [특징]
                 *      1. createRoot에서는 lastScheduledRoot가 null이고, next또한 null이기 때문에 해당하지 않습니다.
                 */
                if (root === lastScheduledRoot || root.next !== null) {}

                /**
                 * @name ensureRootIsScheduled[1.2]
                 * [기능] single root거나, 마지막에 작업한 루트가 아닐때 적용됩니다.
                 * [특징] createRoot에선 초기 진입이므로, 초기화 작업들만 진행됩니다.
                 */
                else {

                    /**
                     * @name ensureRootIsScheduled[1.2-1.1]
                     * [기능] 초기 진입인지 확인합니다.
                     * [변수] lastScheduledRoot: @constant {FiberRoot}
                     * [결과]
                     *      [T] @name ensureRootIsScheduled[1.2-1.1-1] : 최초 진입입니다.
                     *      [F] @name ensureRootIsScheduled[1.2-2] : 최초 진입이 아닙니다.
                     */
                    if (lastScheduledRoot === null) {

                        /**
                         * @name ensureRootIsScheduled[1.2-1.1-1]
                         * [기능] first와 last를 root로 초기화해줍니다.
                         * [변수]
                         *      1. firstScheduledRoot: @constant {FiberRoot}
                         *      2. lastScheduledRoot: @constant {FiberRoot}
                         *      3. root: = ... = new FiberRootNode()
                         */
                        firstScheduledRoot = lastScheduledRoot = root
                    }

                    /**
                     * @name ensureRootIsScheduled[1.2-2]
                     * [기능] lastScheduledRoot.next와 Root를 root로 초기화해줍니다.
                     * [변수]
                     *      1. lastScheduledRoot: @constant {FiberRoot}
                     *      2. root: = ... = new FiberRootNode()
                     */
                    lastScheduledRoot.next = root
                    lastScheduledRoot = root
                }

                /**
                 * @name ensureRootIsScheduled[2]
                 * [기능] update가 들어왔을 때 다음번 schedule까지 true로 지정합니다. 만약 false라면 flushSync를 빠르게 빠져나갈 수 있습니다.
                 */
                mightHavePendingSyncWork = true

                /**
                 * @__DEV__
                 * @name ensureRootIsScheduled[3.1]
                 * [기능] current event 후 root들을 탐색 후 우선순위대로 예약된 작업이 있는지 확인합니다.
                 * [결과]
                 *      [T] 개발자모드에선 "didScheduleMicrotask"가 아닌 "didScheduleMicrotask_act"를 사용합니다.
                 *      [F] @returns {ensureRootIsScheduled[3.2]}
                 * 
                 */
                if (__DEV__ && ReactCurrentActQueue.current !== null) {}

                /**
                 * @name ensureRootIsScheduled[3.2]
                 */
                else {

                    /**
                     * @name ensureRootIsScheduled[3.2-1]
                     * [기능] 최초 진입이거나, microtask가 실행되면 false로 초기화됩니다.
                     * [변수] didScheduleMicrotask: 중복 microtask가 예약되지 않도록 해줍니다.
                     */
                    if (!didScheduleMicrotask) {

                        /**
                         * @name ensureRootIsScheduled[3.2-1.1-1]
                         * [기능] microtask가 실행되었으니 true로 만들어줍니다.
                         */
                        didScheduleMicrotask = true;

                        /**
                         * @name ensureRootIsScheduled[3.2-1-2].scheduleImmediateTask
                         * [기능] cb을 microtask나 schedule을 통해서 관리 실행합니다.
                         * [변수] cb = processRootScheduleInMicrotask: callback함수 @requires 
                         */
                        (function scheduleImmediateTask(cb){

                            /**
                             * @name scheduleImmediateTask[1]
                             * [기능] act scope에서 fake act를 결과를 안기다리고 추가하는데, 결과를 기다리지 않고 사용하기 위해서입니다.
                             * [특징] 추후엔 이를 없애고, microtask를 기다리도록 할 예정입니다.
                             */
                            if (__DEV__ && ReactCurrentActQueue.current !== null) {}

                            /**
                             * @name scheduleImmediateTask[2.1]
                             * [기능] Renderer가 scheduleMicrotask를 지원한지 여부를 결정합니다.
                             * [변수] supportMicrotasks: true
                             * [특징] host config로 옮길 고민중인 변수입니다.
                             */
                            if (supportsMicrotasks){

                                /**
                                 * @name scheduleImmediateTask[2-1].scheduleMicrotask
                                 * [기능] queueMicrotask나 환경과 동일한 method로 전환할 수 있습니다.
                                 * [특징] 
                                 *      1. 실행 context와 render context가 실행중일땐 "Scheduler_scheduleCallback"를 사용해서 실행합니다.
                                 *      2. 아니라면 cb을 단독으로 실행합니다.
                                 *      3. Safari에서 microtask를 실행시 버그가 있기 때문에 microtask가 아닌 macrotask를 실행합니다.
                                 */
                                scheduleMicrotask(cb)
                            }

                            /**
                             * @name scheduleImmediateTask[2.2]
                             * [기능] microtask를 지원하지 않는다면 Schduler를 사용해서 실행합니다.
                             * [변수] ImmediateSchedulerPriority: unstable_ImmediatePriority = 1
                             * TODO: 추후 파악
                             */
                            else { Scheduler_scheduleCallback(ImmediateSchedulerPriority, cb) }
                        })()

                                            /**
                     * @name ensureRootIsScheduled[3.2-1-2].processRootScheduleInMicrotask
                     * [기능] microtask를 실행할 callback함수입니다.
                     * TODO: 추후 파악
                     */
                    (function processRootScheduleInMicrotask(){})()
                    }
                }

                /**
                 * @name ensureRootIsScheduled[4]
                 * [기능] 해당 옵션이 꺼져있다면 render task는 microtask를 기다리지 않고, 바로 실행됩니다.
                 * [변수] enableDeferRootSchedulingToMicrotask = true
                 */
                if (!enableDeferRootSchedulingToMicrotask) {

                    /**
                     * @name ensureRootIsScheduled[4].scheduleTaskForRootDuringMicrotask
                     * TODO: 추후 파악 예정
                     */
                    scheduleTaskForRootDuringMicrotask(root, now())
                }

                /**
                 * @__DEV__
                 * @name ensureRootIsScheduled[5]
                 * [기능] legacy update를 기록합니다.
                 */
                if (__DEV__ && ReactCurrentActQueue.isBatchingLegacy && root.tag === LegacyRoot){ ReactCurrentActQueue.didScheduleLegacyUpdate = true; }
            })()
        })()
    })()

    /**
     * @name hydrateRoot[x+1].markContainerAsRoot
     * [기능] node array에 host root를 등록합니다
     * [변수]
     *      1. root.current: new FiberRootNode(HostRoot)
     *      2. conatainer: document.querySelector('root')
     */
    markContainerAsRoot(root.current, container){}
    
    /**
     * @name hydrateRoot[x+2]
     * [기능] 전역 DOMSharedInternal에 ReactDOMClientDispatcher를 추가합니다.
     * [변수] 
     *      1. ReactDOMClientDispatcher: Internals -> ReactDOM -> HostConfig -> Internals 이렇게 순환참조를하고 있습니다.
     *      2. 수정하지 않는 것을 추천합니다.
     */
    Dispatcher.current = ReactDOMClientDispatcher;

    /**
     * @name hydrateRoot[x+3].listenToAllSupportedEvents
     * [기능] 
     * [특징] hydration은 comment node를 허용하지 않습니다.
     * [변수] rootContainerElement: document.querySelector('root')
     */
    (listenToAllSupportedEvents(rootContainerElement){

        /**
         * @name listenToAllSupportedEvents[1]
         * [기능] 마킹이 안된 루트일 때만 동작합니다.
         * [변수]
         *      1. rootContainerElement: document.querySelector('root')
         *      2. listeningMarker: _reactListening... 난수
         */
        if (!rootContainerElement[listeningMarker]) {

            /**
             * @name listenToAllSupportedEvents[1-1]
             * [기능] 사용하고 있는 Root임을 마킹합니다.
             * [변수]
             *      1. rootContainerElement: document.querySelector('root')
             *      2. listeningMarker: _reactListening... 난수
             */
            rootContainerElement[listeningMarker] = true
            
            /**
             * @name listenToAllSupportedEvents[1-2]
             * [기능] 모든 DOM 이벤트들을 순회합니다.
             * [변수]
             *      allNativeEvents = new Set(): 모든 이벤트
             */
            allNativeEvents.forEach(domEventName => {

                /**
                 * @name listenToAllSupportedEvents[1-2-1]
                 * [기능] selectionchange는 버블링이 되지 않기 때문에 따로 처리
                 */
                if (domEventName !== 'selectionchange') {

                    /**
                     * @name listenToAllSupportedEvents[1-2-2]
                     * [기능] nonDelegatedEvents가 아닐때 처리방식입니다.
                     * [변수] nonDelegatedEvents: 이 이벤트들은 컨테이너에 위임하지말고, target element(실제 태그)에 설정해줘야합니다. 일관된 방식으로 버블링되지 않기 때문입니다.
                     */
                    if (!nonDelegatedEvents.has(domEventName)){

                        /**
                         * @name listenToAllSupportedEvents[1-2-2-1].listenToNativeEvent
                         * [기능] isCapturePhaseListener가 false인 경우 target에 직접 연결
                         * [변수] 
                         *      1. domEventName = event
                         *      2. isCapturePhaseListener = false
                         *      3. target = document.querySelector('root')
                         */
                        (function listenToNativeEvent(domEventName, isCapturePhaseListener, target){

                            /**
                             * @name listenToNativeEvent[1]
                             * [기능] 플래그를 초기화해줍니다.
                             */
                            let eventSystemFlags = 0;

                            /**
                             * @name listenToNativeEvent[2]
                             * [기능] isCapturePhaseListener가 없다면 (특수 이벤트) capture phase를 추가합니다.
                             * [변수] 
                             *      1. isCapturePhaseListener = false
                             *      2. eventSystemFlags
                             *      3. IS_CAPTURE_PHASE = 1 << 2
                             */
                            if (isCapturePhaseListener) { eventSystemFlags |= IS_CAPTURE_PHASE }

                            /**
                             * @name listenToNativeEvent[3].addTrappedEventListener
                             * [기능] 
                             * [변수]
                             *      1. targetContainer = document.querySelector('root')
                             *      2. domEventName: allNativeEvents[x]
                             *      3. eventSystemFlags: EventSystemFlags = 1 << 2
                             *      4. isCapturePhaseListener: isCapturePhaseListener = false
                             *      5. isDeferredListenerForLegacyFBSupport: boolean
                             */
                            (function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener, isDeferredListenerForLegacyFBSupport){

                                /**
                                 * @name addTrappedEventListener[1].createEventListenerWrapperWithPriority
                                 * [변수]
                                 *      1. targetContainer
                                 *      2. domEventName
                                 *      3. eventSystemFlags
                                 */
                                let listener = (function createEventListenerWrapperWithPriority(targetContainer, domEventName, eventSystemFlags){

                                    /**
                                     * @name createEventListenerWrapperWithPriority[1]
                                     * [기능] 변수마다 특수한 경우 우선순위를 달리줍니다.
                                     * [변수] domEventName: allNativeEvents[x]
                                     */
                                    const eventPriority = (function getEventPriority(domEventName){})()

                                    /**
                                     * @name createEventListenerWrapperWithPriority[2]
                                     */
                                    switch(eventPriority){

                                        /**
                                         * @name createEventListenerWrapperWithPriority[2.1]
                                         */
                                        case DiscreteEventPriority: listenerWrapper = dispatchDiscreteEvent

                                        /**
                                         * @name createEventListenerWrapperWithPriority[2.2]
                                         */
                                        case ContinuousEventPriority: listenerWrapper = dispatchContinuousEvent

                                        /**
                                         * @name createEventListenerWrapperWithPriority[2.3]
                                         */
                                        case DefaultEventPriority && default: listenerWrapper = dispatchEvent
                                    }

                                    /**
                                     * @name createEventListenerWrapperWithPriority[3]
                                     */
                                    return listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer)
                                })()

                                /**
                                 * @name addTrappedEventListener[2]
                                 */
                                if (passiveBrowserEventsSupported) {
                                    
                                    /**
                                     * @name addTrappedEventListener[3]
                                     */
                                    if (domEventName === 'touchstart' || domEventName === 'touchmove' || domEventName === 'wheel') { isPassiveListener = true }
                                }

                                /**
                                 * @name addTrappedEventListener[4]
                                 */
                                if(enableLegacyFBSupport && isDeferredListenerForLegacyFBSupport){
                                    targetContainer = targetContainer.ownerDocument
                                }

                                /**
                                 * @name addTrappedEventListener[5]
                                 */
                                if (enableLegacyFBSupport && isDeferredListenerForLegacyFBSupport) {
                                    const originalListener = listener;
                                    
                                    /**
                                     * @name addTrappedEventListener[6].listener
                                     */
                                    listener = function (...p) {

                                        /**
                                         * @name listener[1].removeEventListener
                                         */
                                        removeEventListener(targetContainer, domEventName, unsubscribeListener, isCapturePhaseListener)

                                        /**
                                         * @name listener[2]
                                         */
                                        return originalListener.apply(this, p);
                                    }
                                }

                                /**
                                 * @name addTrappedEventListener[6.1]
                                 */
                                if (isCapturePhaseListener) {

                                    /**
                                     * @name addTrappedEventListener[6.1-1.1]
                                     */
                                    if (isPassiveListener !== undefined) {

                                        /**
                                         * @name addTrappedEventListener[6.1-1.1-1]
                                         */
                                        unsubscribeListener = (function addEventCaptureListenerWithPassiveFlag(targetContainer, domEventName, listener, isPassiveListener){})()
                                    }

                                    /**
                                     * @name addTrappedEventListener[6.1-1.2]
                                     */
                                    else{

                                        /**
                                         * @name addTrappedEventListener[6.1-1.1-1]
                                         */
                                        unsubscribeListener = (function addEventCaptureListener(targetContainer, domEventName,listener){})()
                                    }
                                }

                                /**
                                 * @name addTrappedEventListener[6.2]
                                 */
                                else {

                                    /**
                                     * @name addTrappedEventListener[6.2-1.1]
                                     */
                                    if(isPassiveListener !== undefined) {
                                    
                                        /**
                                         * @name addTrappedEventListener[6.2-1.1-1]
                                         */
                                        unsubscribeListener = (function addEventBubbleListenerWithPassiveFlag(targetContainer, domEventName, listener, isPassiveListener){})()
                                    }

                                    /**
                                     * @name addTrappedEventListener[6.2-1.2]
                                     */
                                    else{

                                        /**
                                         * @name addTrappedEventListener[6.2-1.2-1]
                                         */
                                        unsubscribeListener = (function addEventBubbleListenerWithPassiveFlag(targetContainer, domEventName, listener){})()
                                    }
                                }
                            })()
                        })()
                    }

                    /**
                     * @name listenToAllSupportedEvents[1-2-3]
                     * [기능] isCapturePhaseListener가 true인 경우 root에 이벤트 연결
                     */
                    listenToNativeEvent(domEventName, true, rootContainerElement);
                }
            })

            /** 
             * 아래는 selectionchange만 따로 처리하기 위한 코드
             * [범위] @name listenToAllSupportedEvents[1-3.1] ~ @name listenToAllSupportedEvents[1-4]
            */
            (() => {
                /**
                 * @name listenToAllSupportedEvents[1-3.1]
                 * [기능] root가 document의 node일 경우 ownerDocument에 root를 바로 넣는다. 
                 * [참고]
                 *      1. DOCUMENT_NODE: DOM의 가장 상위 노드로 <html>을 포함
                 *      2. DOCUMENT_TYPE_NODE: 문서의 첫 부분에 나타나는데 <!DOCTYPE html>같은 형태로 표혐
                 *      3. DOCUMENT_FRAGMENT_NODE: 
                 */
                if(rootContainerElement.nodeType === DOCUMENT_NODE){ ownerDocument = rootContainerElement }

                /**
                 * @name listenToAllSupportedEvents[1-3.2]
                 * [기능] 아닐 경우 root의 owndowDocument를 넣는다.
                 */
                else { ownerDocument = rootContainerElement.ownerDocument }

                /**
                 * @name listenToAllSupportedEvents[1-4]
                 * [기능] ownerDocument가 있을 때만 처리
                 */
                if (ownerDocument !== null) {

                    /**
                     * @name listenToAllSupportedEvents[1-4-1]
                     */
                    if (!ownerDocument[listeningMarker]) {

                        /**
                         * @name listenToAllSupportedEvents[1-4-1-1]
                         */
                        ownerDocument[listeningMarker] = true

                        /**
                         * @name listenToAllSupportedEvents[1-4-1-2]
                         */
                        listenToNativeEvent('selectionchange', false, ownerDocument);
                    }
                }
            })()
        }
    })()
    
    /**
     * @name hydrateRoot[x+4].ReactDOMHydrationRoot
     * [기능] DOMHydrationRoot 객체 생성 후 리턴
     */
    return new ReactDOMHydrationRoot(root) = {
        this._internalRoot = internalRoot
    }
}

window = {
    React: {
        ReactSharedInternals: React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    },
    ReactFiberAsyncAction: {
        /**
         * [목적] 함수가 서로의 지역변수를 참조하는 등 다른 범위와 상호작용 및 의존
         */
        currentEntangledLane: Lane = NoLane
    },
    ReactFiberRootScheduler: {
        /**
         * [목적] 같은 이벤트 내에서 동일한 우선순위의 모든 업데이트를 안정화시키기 위한 알고리즘
         * [방법] 하나의 이벤트에 입력되는 최초의 입력을 캐싱하고, 이벤트가 끝났을 때 값을 재 설정하고 concurrent work loop에 진입할 때마다 작업을 진행
         */
        currentEventTransitionLane: Lane = NoLane
    },
    ReactFiberLane: {
        nextTransitionLane: Lane = TransitionLane1
    },
    ReactEventPriorities: {
        currentUpdatePriority: Lane = NoLane
    },
    ReactFiberWorkLoop: {
        executionContext: NoContext = 0b000,
        workInProgressRootRenderLanes: Lanes = NoLanes,
    },
    ReactFiberClassUpdateQueue: {
        currentlyProcessingQueue: SharedQueue<$FlowFixMe>
    },
    ReactFiberConcurrentUpdates: {
        /**
         * 렌더링이 진행중인데 이벤트로부터 업데이트를 받는다면, 렌더링이 끝난 뒤 fiber, hook queue에 넣어줘야합니다.
         */
        concurrentQueues: Array<any> = [],
        concurrentQueuesIndex = 0,
        concurrentlyUpdatedLanes:Lane = NoLanes
    },
}

