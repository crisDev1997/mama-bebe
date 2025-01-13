import { useEffect } from "react";
import "./Inputs.css";
import { useState } from "react";

export const InputData = ({
  campo,
  icon,
  placeholder,
  inputId,
  type,
  width,
  name,
  value,
  onChange,
  onBlur,
  isPassword,
  touched,
  errors
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="campo">
      <span>{campo}</span>
      <div className="input-data">
        {icon ? <i className={icon}></i> : <></>}
        <input
          id={`${inputId}`}
          type={showPassword ? 'text' : type}
          className="input-user-data"
          placeholder={placeholder}
          style={{ width: width ?? "90%" }}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          
        />
        {isPassword && (
          <div
            onClick={handleTogglePassword}
            className="toggle-password"
          >
            {showPassword ?<i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        )}
      </div>
      {touched && errors ? (
        <div className="errors">
          <span>{errors}</span>
        </div>
      ) : null}
    </div>
  );
};

export const SelectData = ({ titulo, defaultOption, options, name, value , onChange}) => {
  return (
    <div className="campo">
      <span>{titulo}</span>
      <div className="input-data">
        <select
          value={value}
          name={name}
          onChange={onChange}
          required
        >
          <option value="" disabled>
            {defaultOption}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const CheckOrSelectData = ({
  titulo,
  defaultOption,
  options,
  selectId,
  width,
  placeholder,
  inputId,
  type,
  defaultUserInfo,
  onChange,
}) => {
  const [useDefault, setUseDefault] = useState(true);
  const [selectedOption, setSelectedOption] = useState('La Paz');
  const [inputText, setInputText] = useState(""); 

  useEffect(()=>{
    setUseDefault(true);
    onChange(defaultUserInfo);
  },[])

  const handleCheckboxChange = () => {
    setUseDefault(!useDefault);
    if(useDefault){
      setInputText('');
      onChange(defaultUserInfo)
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    updateCustomInfo(event.target.value, inputText);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    updateCustomInfo(selectedOption, event.target.value);
  };
  const updateCustomInfo = (selectedOption, inputText)=>{
    const info=selectedOption+' '+inputText;
    onChange(info);
  }

  return (
    <div className="campo">
      <span>{titulo}</span>
      <div className="default-input-data">
        <div className="user-option-default">
          <input
            type="checkbox"
            checked={useDefault}
            onClick={handleCheckboxChange}
          />
          <span>
            Usar {titulo.toLowerCase()}: {defaultUserInfo}{" "}
          </span>
          {useDefault && (
            <i
              className="fa-solid fa-check"
              style={{ color: "green", marginLeft: "5px" }}
            ></i>
          )}
        </div>

        <div className="row-inputs select-input-data">
          <select
            id={selectId}
            value={selectedOption}
            onChange={handleSelectChange}
            disabled={useDefault}
          >
            <option value="" disabled>
              {defaultOption}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type={type}
            className={`input-user-data ${useDefault ? "disabled-style" : ""}`}
            id={`${inputId}`}
            placeholder={placeholder}
            style={{ width: width ?? "100%", marginLeft: "10px" }}
            disabled={useDefault}
            value={useDefault == true ? "" : inputText}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export const InputLogin = ({
  icon,
  placeholder,
  inputId,
  type,
  width,
  name,
  formik,
  isPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="campo">
      <div className="input-data">
        {icon ? <i className={icon}></i> : <></>}
        <input
          id={`${inputId}`}
          type={showPassword ? 'text' : type}
          className="input-user-data"
          style={{ width: width ?? "90%" }}
          placeholder={placeholder}
          name={name}
          value={formik.values[`${name}`]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {isPassword && (
          <div
           
            onClick={handleTogglePassword}
            className="toggle-password"
          >
            {showPassword ?<i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        )}
      </div>
      {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
        <div className="errors">
          <span>{formik.errors[`${name}`]}</span>
        </div>
      ) : null}
    </div>
  );
};
