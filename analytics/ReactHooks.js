
/**
 * 렌더링 환경에 따라 사용되는것이 달라지기 때문에 변할 수 있습니다.
 * 서버사이드와 클라사이드때 달라집니다.
 * @returns 
 */
function resolveDispatcher() {
    const dispatcher = ReactCurrentDispatcher.current;

    // Will result in a null access error if accessed outside render phase. We
    // intentionally don't throw our own error because this is in a hot path.
    // Also helps ensure this is inlined.
    return ((dispatcher: any): Dispatcher);
  }