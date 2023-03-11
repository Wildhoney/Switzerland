// @ts-nocheck

import { Component } from "preact";
import { Attrs } from "../use/index.js";
import { Props, State } from "./types.js";

export default class SwissTree extends Component<Props, State> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { Tree, attrs } = this.props;

    return (
      <Attrs.Provider value={attrs}>
        <Tree attrs={attrs} error={this.state.error} />
      </Attrs.Provider>
    );
  }
}
