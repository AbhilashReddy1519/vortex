import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

const PasswordInput: React.FC<PasswordInputProps> = ({
	label,
	id,
	labelStyles = "",
	inputStyles = "",
	errors = {},
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<label
				htmlFor={id}
				className={`font-quintessential text-xl ${labelStyles}`}>
				{label}
			</label>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					{...props}
					className={`border text-xl w-full pr-10 rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2 ${inputStyles}`}
				/>
				<div className="absolute top-6.75 right-3 -translate-y-1/2">
					<button
						type="button"
            className="cursor-pointer"
						aria-label={
							showPassword ? "Hide password" : "Show password"
						}
						onClick={() => setShowPassword((prev) => !prev)}>
						{showPassword ? <Eye /> : <EyeClosed />}
					</button>
				</div>
			</div>
			{errors?.[id] && (
				<p className="text-red-500">{errors[id].message}</p>
			)}
		</>
	);
};

export default PasswordInput;
