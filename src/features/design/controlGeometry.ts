export type Box = [number, number, number, number];
export type ControlLayer = {
  node: string;
  box: Box;
  role: 'shape' | 'copy' | 'link';
  target?: string;
  text?: string;
};
const contains = (outer: Box, inner: Box) =>
  inner[0] >= outer[0] - 0.6 &&
  inner[1] >= outer[1] - 0.6 &&
  inner[0] + inner[2] <= outer[0] + outer[2] + 0.6 &&
  inner[1] + inner[3] <= outer[1] + outer[3] + 0.6;

export function controlGeometry(
  layers: ControlLayer[],
  actions: Record<string, () => void>,
  fields: Set<string>,
) {
  const inputs: Record<string, Box> = {};
  const backgrounds: { node: string; content: ControlLayer }[] = [];
  const targets = layers.filter(
    (layer) => layer.role === 'link' || fields.has(layer.node) || actions[layer.node],
  );
  const shapes = layers.filter(
    (layer) => layer.role === 'shape' && layer.box[2] >= 30 && layer.box[3] >= 22 && layer.box[3] <= 175,
  );
  for (const field of targets.filter((layer) => fields.has(layer.node))) {
    // Only borrow a single control's plate. A multi-field form shares a larger card.
    const candidates = shapes.filter(
      (layer) =>
        contains(layer.box, field.box) &&
        layer.box[2] > field.box[2] &&
        !targets.some((other) => other.node !== field.node && contains(layer.box, other.box)),
    );
    candidates.sort((a, b) => a.box[2] * a.box[3] - b.box[2] * b.box[3]);
    if (candidates[0]) inputs[field.node] = candidates[0].box;
  }
  for (const shape of shapes) {
    if (shape.box[3] > 60 || actions[shape.node] || targets.some((layer) => layer.node === shape.node))
      continue;
    const inside = targets.filter((layer) => contains(shape.box, layer.box));
    if (inside.length === 1 && !fields.has(inside[0].node))
      backgrounds.push({ node: shape.node, content: inside[0] });
  }
  return { inputs, backgrounds };
}
