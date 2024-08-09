import { forwardRef } from "react";
import { cn } from "../../../utils/cn";

const Input = forwardRef(
	(
		{
			id,
			type,
			label,
			value,
			name,
			required,
			onChange,
			placeholder,
			className,
			disabled = false,
		},
		ref
	) => {
		return (
			<span className="flex w-full justify-center gap-0.5 flex-col relative">
				{label && (
					<label
						htmlFor={id}
						className={cn(
							"select-none text-neutral-900/50 transition-all duration-150 text-xs text-left",
							value && "text-slate-900/90"
						)}>
						{label}
						{required && (
							<span className={cn(!value && "text-red-500")}> *</span>
						)}
					</label>
				)}
				<input
					disabled={disabled}
					id={id}
					ref={ref}
					name={name}
					autoComplete="on"
					value={value ?? ""}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
					className={cn(
						"w-full h-full p-3 font-dm-sans bg-transparent outline-none border rounded-sm transition-all duration-150 ease-linear focus-visible:border-neutral-500 border-neutral-400 placeholder:text-[12px] placeholder:text-neutral-900/50 text-sm text-neutral-900/90 disabled:opacity-50",
						className,
						value &&
							"border-neutral-900/90 text-neutral-900/70 text-sm bg-[#e7f0fe]"
					)}
				/>
			</span>
		);
	}
);

Input.displayName = "Input";

export default Input;
