"use client";
import {
	ColorPicker as AriaColorPicker,
	type ColorPickerProps as AriaColorPickerProps,
	Button,
	DialogTrigger,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorWheel } from "@/components/react-aria-components/ColorWheel";
import { ColorArea } from "./ColorArea";
import { ColorField } from "./ColorField";
import { ColorSlider } from "./ColorSlider";
import { ColorSwatch } from "./ColorSwatch";
import { Dialog } from "./Dialog";
import { Popover } from "./Popover";
import { focusRing } from "./utils";

const buttonStyles = tv({
	extend: focusRing,
	base: "flex gap-2 items-center cursor-default rounded-xs text-sm text-gray-800 dark:text-gray-200",
});

export interface ColorPickerProps extends AriaColorPickerProps {
	label?: string;
}

export function ColorPicker({ label, ...props }: ColorPickerProps) {
	return (
		<AriaColorPicker {...props}>
			<DialogTrigger>
				<Button className={buttonStyles}>
					<ColorSwatch />
					<span>{label}</span>
				</Button>
				<Popover placement="bottom start">
					<Dialog className="flex flex-col gap-2">
						<div className="relative">
							<ColorWheel />
							<ColorArea
								colorSpace="hsb"
								xChannel="saturation"
								yChannel="brightness"
								className="size-25 !absolute inset-12"
							/>
						</div>
						<ColorSlider channel="alpha" />

						<ColorField label="Hex" />
					</Dialog>
				</Popover>
			</DialogTrigger>
		</AriaColorPicker>
	);
}
