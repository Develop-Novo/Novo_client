import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IData {
    name: string;
    email: string;
    password: string;
}

function RegisterPage() {
    const [popupOpen, setPopupOpen] = useState(false);
    //nativgate/////
    const navigate = useNavigate();
    //regex/////////
    const regex = /^(?=.*[A-Za-z])(?=.*\d|.*[\W_]).{6,}$/;
    ////////////////
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IData>();
    const onValid = (data: IData) => {
        console.log(data.password);
        console.log(regex.test(data.password));
        if (!regex.test(data.password)) {
            setError(
                "password", //에러 이름. 기존에 있는 것과 겹칠시 그쪽으로 에러 들어감
                { message: "비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 6자리 이상이어야 합니다." }, //errors에 넣을 에러 메시지
                { shouldFocus: true } //에러 발생시 해당 구간에 포커스하게 하는 설정
            );
        } else {
            //console.log("Backend에 전송");
            const postMember = async () => {
                try {
                    const response = await axios.post('/member/new', {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    //console.log(response);
                } catch (error) {
                    console.log(error);
                }
            };
            postMember();
            setPopupOpen(true);
        }
    }

    return <>
        <div className={styles.container__wrapper}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onValid)}>
                    <img className={styles.novo__logo} src="/images/novo__logo.png" alt="novo__logo" />
                    <h1 id={styles.form__title}>
                        회원가입
                    </h1>
                    <input className={styles.input} id={styles.input__name}
                        {...register("name", { required: "정확하지 않은 이름입니다." })}
                        placeholder="이름"
                        type="text"
                    />
                    {errors?.name && <div className={styles.error__message} id={styles.error__message__name}>{errors?.name?.message}</div>}
                    <input className={styles.input} id={styles.input__email}
                        {...register("email", { required: "정확하지 않은 이메일입니다." })}
                        placeholder="이메일"
                        type="email"
                    />
                    {errors?.email && <div className={styles.error__message} id={styles.error__message__email}>{errors?.email?.message}</div>}
                    <input className={styles.input} id={styles.input__password}
                        {...register("password", { required: "정확하지 않은 비밀번호입니다." })}
                        placeholder="비밀번호"
                        type="password"
                    />
                    {errors?.password && <div className={styles.error__message} id={styles.error__message__password}>{errors?.password?.message}</div>}
                    <button className={styles.button__submit} type="submit">
                        <div className={styles.button__submit__text}>
                            회원가입
                        </div>
                    </button>
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                        <div className={styles.login__link}>
                            이미 가입하셨나요? <span id={styles.login__link__highlight}>로그인</span>
                        </div>
                    </Link>

                    <hr className={styles.form__hr} />
                    <div className={styles.form__hr__or__text}>OR</div>
                    <div className={styles.logos}>
                        <img className={styles.logo} src="/images/naver__icon.png" alt="naver__icon" />
                        <img className={styles.logo} src="/images/kakao__icon.png" alt="kakao__icon" />
                        <img className={styles.logo} src="/images/google__icon.png" alt="google__icon" />
                        <img className={styles.logo} src="/images/twitter__icon.png" alt="twitter__icon" />
                        <img className={styles.logo} src="/images/apple__icon.png" alt="apple__icon" />
                    </div>
                </form>
            </div>
            {popupOpen && <>
                <div className={styles.cover} onClick={() => setPopupOpen(false)} />
                <div className={styles.popup}>
                    <div className={styles.success__message}>회원가입이 완료되었습니다!</div>
                    <div className={styles.popup__hr} />
                    <span className={styles.popup__button}>
                        <Link to={`${process.env.PUBLIC_URL}/`}>
                            로그인하기
                        </Link>
                    </span>
                </div>
            </>}
        </div>
    </>
}

export default RegisterPage;
