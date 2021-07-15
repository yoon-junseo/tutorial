import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GoogleLogin from "react-google-login";

const { naver } = window as any;

const Login = () => {
  const googleId =
    "749306268094-m8hqd06ouvvo2rl4ac1d4o78j3aa7m2p.apps.googleusercontent.com";
  const naverId = "IJ7GzNOsMH9wRsRGA15e";
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: naverId,
      callbackUrl: "http://localhost:3000/",
      isPopup: false,
      loginButton: {
        color: "green",
        type: 2,
        height: "50",
      },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const location = useLocation();

  const getNaverToken = () => {
    console.log(location);
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  return (
    <>
      <GoogleLogin
        clientId={googleId}
        buttonText="Google"
        onSuccess={(result) => console.log(result)}
        onFailure={(result) => console.log(result)}
      />
      <div id="naverIdLogin" />
    </>
  );
};

export default Login;
