// $FlowFixMe[prop-missing] found when upgrading Flow
ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount =
  // $FlowFixMe[missing-this-annot]
  function (): void {
    const root = this._internalRoot;
    if (root !== null) {
        // root 초기화
      this._internalRoot = null;
      const container = root.containerInfo;
      // root 노드 변경사항 처리를 즉시 실행하도록함
      flushSync(() => {
        updateContainer(null, root, null, null);
      });
      // root 컨테이너 목록 제거
      unmarkContainerAsRoot(container);
    }
  };

  ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render =
  // $FlowFixMe[missing-this-annot]
  function (children: ReactNodeList): void {
    const root = this._internalRoot;
    if (root === null) {
      throw new Error('Cannot update an unmounted root.');
    }

    updateContainer(children, root, null, null);
  };