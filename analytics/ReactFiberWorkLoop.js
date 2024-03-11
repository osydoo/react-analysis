        /**
         * @name createHydrationContainer[5].requestUpdateLane
         * [기능] fiber의 mode를 통해 Lane을 가져옵니다.
         * [변수] current = root.current = createHostRootFiber() = createFiber() = new FiberNode(HostRoot, ...)
         */
        function requestUpdateLane(current){
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
        }
