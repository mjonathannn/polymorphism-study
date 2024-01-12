import {
  ElementType,
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react";

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, Props> = keyof (AsProp<C> & Props);

type TextProps = { color?: Rainbow | "black" };

type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export const Text = <C extends ElementType = "span">(
  props: PolymorphicComponentProp<C, TextProps>
) => {
  const { as, color, children, ...rest } = props;

  const Component = as || "span";

  const style = color ? { style: { color } } : {};

  return (
    <Component {...style} {...rest}>
      {children}
    </Component>
  );
};
