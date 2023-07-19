import { Input, theme } from "antd";
import { ErrorMessage, Field } from "formik";
function TextField({
  name,
  placeholder,
  label = null,
  isRequired = true,
  htmlType = "text",
  input = "input",
  height = "100px",
  suffix = null,
  disabled = false,
  onChange = null,
}: any) {
  const {
    token: { colorText },
  } = theme.useToken();
  return (
    <div className="flex-1">
      {" "}
      <div className="my-3">
        {label && (
          <div className="mb-2">
            <label style={{ color: colorText }}>
              {label}
              <span className="text-red-500">&nbsp;{isRequired && "*"}</span>
            </label>
          </div>
        )}
        <Field name={name}>
          {({ field }: any) =>
            input === "input" ? (
              <Input
                placeholder={placeholder}
                {...field}
                type={htmlType}
                suffix={suffix}
                disabled={disabled}
                onChange={onChange}
              />
            ) : (
              <Input.TextArea
                placeholder={placeholder}
                {...field}
                type={htmlType}
                style={{
                  height: height,
                }}
              />
            )
          }
        </Field>
        <div className="text-red-500 text-xs mt-1">
          {" "}
          <ErrorMessage name={name} component={"div"} />
        </div>
      </div>
    </div>
  );
}

export default TextField;
