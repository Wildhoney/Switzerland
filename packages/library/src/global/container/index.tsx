import { Component, VNode } from "preact";
import { GetAttrs, SwissAttrs } from "../types/index.js";
import { Attrs } from "../use/index.js";
import { Props, State } from "./types.js";

export default class SwissContainer<Attrs extends SwissAttrs> extends Component<
  Props<Attrs>,
  State
> {
  override state = { error: null };

  static override getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error): void {
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
