interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <h1>Вы успешно зарегистрировались в NEXT PARTS!</h1>

      <p>
        Благодарим Вас за регистрацию в интернет-магазине NEXT PARTS! Пожалуйста, завершите
        регистрацию, подтвердив свой email по ссылке:
      </p>

      <p>
        <a
          href={`${
            ((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
              process.env.NEXT_PUBLIC_API_URL) as string
          }/auth/verify?code=${code}`}>
          {/* <a href={`{http://localhost:3000/api/auth/verify?code=${code}`}> */}
          Подтвердить регистрацию аккаунта в NEXT PARTS
        </a>
      </p>

      <p>С уважением, команда NEXT PARTS</p>

      <hr />
      <p>Если вы не регистрировались в NEXT PARTS, то просто проигнорируйте это письмо</p>
    </div>
  );
};
