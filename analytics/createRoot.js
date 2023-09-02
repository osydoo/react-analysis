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
 */

// ReactDOM.js
const createRoot.arguments: RootType = {
    container, //: Element | Document | DocumentFragment, querySelector('root')
    options?: //: CreateRootOptions,
}
const hydrateRoot.arguments: RootType = {
    ...createRoot.arguments,
    initialChildren, //: ReactNodeList,
}

// ReactFiberReconciler.js
const createContainer.arguments: OpaqueRoot = {
    containerInfo, // createRoot.args.container
    tag = ConcurrentRoot = 1!, // lagecy = 0
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
const createHydrateContainer.arguments: OpaqueRoot = {
    ...createContainer.arguments,
    hydrationCallbacks, //: SuspenseHydrationCallbacks?, hydrateRoot.args.options
    initialChildren,  // hydrateRoot.args.initialchildren
    callback = null, //: Function?, TODO: 레거시 모드가 삭제되면 사라질 변수
}

// ReactFiberRoot.js
const createFiberRoot.arguments: FiberRoot = {
    containerInfo, // createRoot.args.container
    tag, //createContainer.args.tag = 1
    initialChildren, // hydrateRoot.args.initialChildren, creatRoot is null
    hydrate, //: Boolean,
    hydrationCallbacks, //:, createHydrateContainer.args.hydrationCallbacks
    /** createRoot.args.options.createContainer */ 
    /** ----------------------- */
}

// ReactFilber.js
const createHostRootFiber.arguments: Fiber = {
    tag, // createContainer.args.tag = 1
    isStrictMode, // createContainer.args.isStrictMode
    concurrentUpdatesByDefaultOverride, // createContainer.args.concurrentUpdatesByDefaultOverride
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

    //  createContainer(){ : createFiberRoot를 하기전 hydrate와 구분하기 위한 초기화
    //      createFiberRoot(){
    //          new FiberRootNode()
    //          createHostRootFiber()
    // tag === 1 / 
    mode = 0b0000000 // tag === 1
            |= 0b0011000 // isStrictMode || createRootStrictEffectsByDefault, strictEffectsMode 여부 - 없앨 예정
                
    root = {
        tag = ConcurrentRoot = 1,
        containerInfo,
        pendingChildren = null,
        pingCache = null,
        finishedWorkd = null,
        timeoutHandle = noTimeout = -1, // 테스트용 옵션
        cancelPendingCommit = null,
        context = null;
        pendingContext = null,
        next = null,
        callbackNode = null,
        callbackPrioirty = NoLanes = 0b0000000000000000000000000000000,
        expirationTimes = [-1].length(31),

        pendingLanes = NoLanes,
        suspendedLanes = NoLanes,
        pingedLanes = NoLanes,
        expiredLanes = NoLanes,
        finishedLanes = NoLanes,
        errorRecoveryDisabledLanes = NoLanes,
        shellSuspendCounter = 0,

        entangledLanes = NoLanes,
        entanglements = [NoLanes].length(31),

        hiddenUpdates = [null].length(31),

        identifierPrefix,
        onRecoverableError,

        /** 
         * new FiberRootNode: if endableCache = true! 
        */
        pooledCache = null,
        pooledCacheLanes = NoLanes,
        
        /** 
         * 특징 : 동작안하는데, 아직 삭제 못 함 Transition Tracing proposal로 대체 예정
         * 용도 : suspense에 콜백 property를 추가해 업데이트 queue에 어떤 promise가 있는지 알려 사용자에게 로딩을 보여줍니다.
         * new FiberRootNode: if endableSuspenseCallback = false!
         * createFiberRoot(): if enableSuspenseCallback = false! 
        */
        hydrationCallbacks = hydrationCallbacks = null,

        incomplateTransitions = new Map(),

        /** 
         * new FiberRootNode: if enableTransitionTracing = false!,  
        */
        transitioncallbacks = null,
        transitionLanesMap = [null].length(31),

        /** 
         * __Profile__ = false!
         * new FiberRootNode: if enableProfilerTimer = __Profile__ && enableProfilerCommiHooks = __Profile__ 
        */
        effectDuration = 0,
        passiveEffectDuration = 0,

        /** 
         * new FiberRootNode: if enableUpdaterTracking = __Profile__ 
        */
        memoizedUpdater = new Set(),
        pendingUpdatersLaneMap = [new Set()].length(31),

        // hydrate는 __DEV__에서만 사용
    }
    
    return root = createFiberRoot(
        ...createContainer.arguments,
        hydrate = false,
        initialChildren = null
    )
}

// createRoot와 다른점만 기입
function createHydrateRoot(container, initialChildren, options?): RootType {
    const hydrationCallbacks = options != null ? options : null;
    // 6 ~ 12
    // createHydrationContainer() : root에 update.lane과 context 추가
    createFiberRoot(
        ...createContainer.arguments,
        hydrationCallbacks,
        initialChildren,
        hydrate = false,
    )

    // dbsehddn 해야함2!
    // TODO: Move this to FiberRoot constructor
    root.context = getContextForSubtree(null);

    // Schedule the initial render. In a hydration root, this is different from
    // a regular update because the initial render must match was was rendered
    // on the server.
    // NOTE: This update intentionally doesn't have a payload. We're only using
    // the update to schedule work on the root fiber (and, for legacy roots, to
    // enqueue the callback if one is provided).
    const current = root.current;
    const lane = requestUpdateLane(current);
    const update = createUpdate(lane);
    update.callback =
        callback !== undefined && callback !== null ? callback : null;
    enqueueUpdate(current, update, lane);
    scheduleInitialHydrationOnRoot(root, lane);

    return root;
}