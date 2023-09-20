/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/state-in-constructor */
import React from 'react';

// 高阶组件
const withTransition = (WrappedComponent) =>
  class extends React.Component {
    state = {
      in: false,
    };

    componentDidMount() {
      // 在组件挂载后，启动过渡动画
      setTimeout(() => this.setState({ in: true }), 0);
    }

    componentWillUnmount() {
      // 在组件卸载前，结束过渡动画
      this.setState({ in: false });
    }

    render() {
      return (
        <div className={`transition ${this.state.in ? 'enter' : 'exit'}`}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };

export default withTransition;
