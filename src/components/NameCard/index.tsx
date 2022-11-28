import type { FC } from "react";
import type { NameCardProps } from "./type/model";

const NameCard: FC<NameCardProps> = ({
  iconUrl,
  name,
  discriminator,
  isNameBig,
  nameStyle,
  baseStyle,
  ...res
}) => (
  <div
    className={`${baseStyle} flex h-16 select-none space-x-1 truncate rounded-lg p-1 text-center`}
    {...res}
  >
    <div className="pointer-events-none h-14 w-14 rounded-full bg-orange-100 p-[2px]">
      <img src={iconUrl} alt="icon" className="h-full rounded-full" />
    </div>
    <div
      className={`${nameStyle} pointer-events-none flex h-14 flex-col items-center  justify-center rounded-md bg-white px-2 drop-shadow-md`}
    >
      <p className={`${isNameBig ? "h-8" : "h-6"} h-6 w-full truncate`}>
        {name}
      </p>
      <p className="h-4 w-full truncate text-xs text-gray-500">
        {`#${discriminator}`}
      </p>
    </div>
  </div>
);

export default NameCard;
