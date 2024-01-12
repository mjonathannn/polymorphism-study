import {
  ElementType,
  PropsWithChildren,
  ComponentPropsWithRef,
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

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type PropsToOmit<C extends ElementType, Props> = keyof (AsProp<C> & Props);

type TextProps = { color?: Rainbow | "black" };

type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export const Text = <C extends ElementType = "span">(
  { as, color, children, ...rest }: PolymorphicComponentProp<C, TextProps>,
  ref?: PolymorphicRef<C>
) => {
  const Component = as || "span";

  const style = color ? { style: { color } } : {};

  return (
    <Component ref={ref} {...style} {...rest}>
      {children}
    </Component>
  );
};
