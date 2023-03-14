import { Component, VNode } from "preact";
import { GetAttrs, SwissAttrs } from "../types/index.js";
import { Attrs } from "../use/index.js";
import { Props, State } from "./types.js";

export default class SwissContainer<Attrs extends SwissAttrs> extends Component<
  Props<Attrs>,
  State
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error): void {
    this.setState({ error });
  }

  render(): VNode {
    const { Tree, attrs } = this.props;

    return (
      <Attrs.Provider value={attrs}>
        <Tree attrs={attrs as GetAttrs<Attrs>} error={this.state.error} />
      </Attrs.Provider>
    );
  }
}
