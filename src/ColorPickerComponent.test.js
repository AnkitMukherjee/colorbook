import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ColorPicker from "./ColorPickerComponent.js";

test("rendering default colors", () => {
	// Arrange, Act, Assert (AAA)
	// Arrange: Setting up variables, functions, etc.

	const rating = 2;
	const onClick = () => {};

	// Act: Perform the action; the thing we are acting upon
	const { getAllByTestId } = render(
		<ColorPicker
			customColors={allColors}
			accentColor={accentColor}
			onClick={setAccentColor}
		/>
	);

	// Assert: What are the expectations, e.g. "Did we render X?"
	expect(getAllByTestId("star").length).toBe(5);
});
