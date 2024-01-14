type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, Props> = keyof (AsProp<C> &
  Props);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<AsProp<C> & Props> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type TextProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { color?: Rainbow | "black" }
>;

export const Text = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => {
  const { as, color, ...rest } = props;

  const Component = as || "span";

  const style = color ? { style: { color } } : {};

  return <Component {...style} {...rest} />;
};
