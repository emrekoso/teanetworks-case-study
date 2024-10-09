import {create} from "zustand";

export const authStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,

    signUpFetch: async (email, password, name) => {
        set({isLoading: true})

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email);

        if(existingUser){
            set({isLoading: false});
            set({error: "Email already exists"});
        }

        const newUser = { email, password, name };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("user", JSON.stringify(newUser));
        set({ user: newUser });
        set({ isLoading: false });
        set({ error: null });
    },

    loginFetch: async (email, password) => {
        set({ isLoading: true });


        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (!foundUser) {
            set({ isLoading: false });
            set({ error: "Invalid credentials!" });
            throw new Error("Invalid credentials!");
        }

        localStorage.setItem("user", JSON.stringify(foundUser));
        set({ user: foundUser });
        set({ isLoading: false });
        set({ error: null });
    },


    logout: () => {
        localStorage.removeItem("user")
        set({user: null})
    },

}))