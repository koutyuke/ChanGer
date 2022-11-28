import type { ComponentPropsWithoutRef } from "react";

export type NameCardProps = {
  iconUrl: string;
  name: string;
  discriminator: string;
  nameStyle: string;
  baseStyle: string;
  isNameBig?: boolean;
} & ComponentPropsWithoutRef<"div">;
