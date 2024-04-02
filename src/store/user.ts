import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IUser, getCurrentUser } from "@/api/user";
import { IResume, getResume } from "@/api/resume";

type Action = {
  updateToken: (token: string) => void;
  updateUserInfo: (userInfo: IUser) => void;
  getCurrentUser: () => void;
  getCurrentResume: () => void;
};

interface State {
  token: string;
  resume: IResume[];
  userInfo: IUser;
}

export const userUserStore = create<State & Action>()(
  immer((set) => ({
    token: "",
    resume: [],
    userInfo: {
      address: "",
      chainId: 0,
      id: 0,
      integral: 100,
    },
    updateToken: (token) =>
      set((state) => {
        state.token = token;
      }),
    updateUserInfo: (userInfo) =>
      set((state) => {
        state.userInfo = userInfo;
      }),
    getCurrentUser: async () => {
      try {
        const { result } = await getCurrentUser();
        set((state) => {
          state.userInfo = result;
        });
      } catch (error) {
        if (error.code === "10102") {
          localStorage.removeItem("token");
          set((state) => {
            state.token = "";
          });
        }
      }
    },
    getCurrentResume: async () => {
      try {
        const { result } = await getResume();
        set((state) => {
          state.resume = result.list;
        });
      } catch (error) {}
    },
  }))
);
