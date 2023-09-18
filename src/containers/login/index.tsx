import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const loginInputSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

type LoginInputSchema = z.infer<typeof loginInputSchema>;

interface Props {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const toast = useRef<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
  });

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Incorrect username or password",
      life: 5000,
    });
  };

  const onSubmit: SubmitHandler<LoginInputSchema> = (data) => {
    if (data.username === "user" && data.password === "123") {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      showError();
    }
  };

  const handlePopulate = () => {
    setValue("username", "user");
    setValue("password", "123");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-slate-700 font-bold capitalize text-center mb-2">
        login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5">
          <input
            id="username"
            type="text"
            placeholder="Username..."
            className={`input-style ${
              !!errors.username ? "invalid-input-style" : ""
            }`}
            {...register("username")}
          />
          {!!errors.username && (
            <p className="error-message-style">{errors.username.message}</p>
          )}
        </div>
        <div className="my-5">
          <input
            id="password"
            type="text"
            placeholder="Password..."
            className={`input-style ${
              !!errors.username ? "invalid-input-style" : ""
            }`}
            {...register("password")}
          />
          {!!errors.password && (
            <p className="error-message-style">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-500 py-1 min-w-[100px] text-white capitalize rounded mx-auto block"
        >
          {isLoading
            ? // <ProgressSpinner
              //   style={{
              //     width: "30px",
              //     height: "30px",
              //   }}
              //   strokeWidth="2"
              //   fill="white"
              //   animationDuration=".5s"
              // />
              "loading..."
            : "login"}
        </button>
      </form>

      <button onClick={handlePopulate}>populate</button>

      <Toast ref={toast} />
    </div>
  );
};

export default Login;
