import "./custommessage.css";

export default function CustomDialog({ title, message }) {
  return (
    <div>
      {
        <div className="md:w-7/12 m-auto mt-10 mb-10 border-2  regist-form-wrapper">
          <div className="w-full custom-dialog-title">
            <h1 className="text-2xl text-center">{title}</h1>
          </div>

          <p className="p-1 text-xl text-center">{message}</p>
        </div>
      }
    </div>
  );
}
