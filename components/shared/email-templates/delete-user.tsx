  interface Props {
    className?: string,
  }
  
  export const DeleteUserTemplate: React.FC<Props> = ({className}) => {
    return (
      <div>
        <h1>Вы удалили учётную запись в NEXT PARTS</h1>
  
        <p>
          Вы только что удалили учётную запись в интернет-магазине NEXT PARTS. Ваши персональные данные были удалены из базы данных магазина. Благодарим Вас за покупки в NEXT PARTS.
        </p>
  
        <hr />
        <p>Если вы не регистрировались в NEXT PARTS, то просто проигнорируйте это письмо</p>
      </div>
    );
  };
  