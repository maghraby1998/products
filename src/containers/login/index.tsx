import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { LoginInputSchema, loginInputSchema } from "../../helpers/validations";

interface Props {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const toast = useRef<any>(undefined);

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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginInputSchema> = (data) => {
    if (data.username === "user" && data.password === "123") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate("/users");
      }, 1000);
    } else {
      showError();
    }
  };

  const handlePopulate = () => {
    setValue("username", "user");
    setValue("password", "123");
  };

  return (
    <div className="flex-col md:flex-row flex items-center justify-center">
      <div className="h-screen w-full py-3 flex-1 flex flex-col items-center justify-center bg-[#999]/10">
        <h1 className="text-3xl text-slate-700 font-bold capitalize text-center mb-2">
          Welcome
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
            {isLoading ? <i className="pi pi-spinner pi-spin" /> : "login"}
          </button>
        </form>

        <button
          className="bg-yellow-500 py-1 mt-10 px-2 text-[#222] min-w-[100px] text-white capitalize rounded mx-auto block"
          onClick={handlePopulate}
          data-testid={"populate-btn"}
        >
          populate correct credentials
        </button>

        <Toast ref={toast} />
      </div>

      <div className="flex-1 h-screen flex items-center justify-center">
        <img src={"/background.jpg"} alt="" />
      </div>
    </div>
  );
};

export default Login;
