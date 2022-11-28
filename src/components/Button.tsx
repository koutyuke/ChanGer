import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { MdSettings, MdHome } from "react-icons/md";
import { TbRefresh, TbExchange } from "react-icons/tb";

type ButtonBaseProps = {
  IsSetting: boolean;
};

type SettingProps = {
  setSetting: Dispatch<SetStateAction<boolean>>;
  IsSetting: boolean;
};

export const Setting: FC<SettingProps> = ({ setSetting, IsSetting }) => (
  <button
    type="button"
    className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300"
    onClick={() => {
      setSetting(!IsSetting);
    }}
  >
    <MdSettings size={48} />
  </button>
);

export const Home: FC<ButtonBaseProps> = ({ IsSetting }) => (
  <button
    type="button"
    className={`${
      IsSetting ? "hidden" : "block"
    } flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300`}
    onClick={() => {
      console.log("hoge");
    }}
  >
    <MdHome size={48} />
  </button>
);

export const Reset: FC<ButtonBaseProps> = ({ IsSetting }) => (
  <button
    type="button"
    className={`${
      IsSetting ? "hidden" : "block"
    } flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300`}
    onClick={() => {
      console.log("hoge");
    }}
  >
    <TbRefresh size={48} />
  </button>
);

export const Change: FC<ButtonBaseProps> = ({ IsSetting }) => (
  <button
    type="button"
    className={`${
      IsSetting ? "hidden" : "block"
    } flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300`}
    onClick={() => {
      console.log("hoge");
    }}
  >
    <TbExchange size={48} />
  </button>
);

type BaseSettingProps = {
  isSetting: boolean;
  Children: ReactNode;
  onClick: () => void;
  style: string;
};

const BaseSettingButton: FC<BaseSettingProps> = ({
  isSetting,
  Children,
  onClick,
  style,
}) => (
  <button
    type="button"
    className={`${
      isSetting ? "hidden" : "block"
    } ${style} flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300`}
    onClick={onClick}
  >
    {Children}
  </button>
);
