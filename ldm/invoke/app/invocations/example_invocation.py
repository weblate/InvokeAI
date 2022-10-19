# Copyright (c) 2022 Kyle Schouviller (https://github.com/kyle0654)

from typing import Literal, Union
from pydantic import Field
from .image import ImageField
from .baseinvocation import BaseInvocation, BaseInvocationOutput
from ..services.invocation_services import InvocationServices


class ExampleInvocationOutput(BaseInvocationOutput):
    """Give the invocation output a type. Must be unique among all invocations."""

    """Output used by ExampleInvocation"""
    type: Literal["example_invocation_output"] = "example_invocation_output"

    """
    Here are the output fields for this invocation. Valid types are:
    - str (string)
    - int (integer)
    - float (floating-point)
    - ImageField (an image)
    - bool (Boolean)

    You can have as many outputs as you like, in any combination of types.

    Outputs need a short description. It is also used for tooltips in the UI.

    They have a small number of possible UI hints, like a label, or the name of
    another field they should be positioned next to.

    If no label is given, one will be made from the field's property name.

    All outputs get a handle.
    """
    string_output: str = Field(
        description="A string output", ui={"next_to": "string_input_2"}
    )
    integer_output: int = Field(
        description="An integer output", ui={"label": "My little integer output label"}
    )
    float_output: float = Field(description="A float output")
    image_output: ImageField = Field(description="An image output")
    boolean_output: bool = Field(description="A boolean output")


class ExampleInvocation(BaseInvocation):
    """Give the invovation a type. Must be unique among all invocations."""

    type: Literal["example_invocation"] = "example_invocation"

    """
    Now onto the input fields for this invocation. We'll have one of each type of

    These inputs have the ui hint `"requires_connection": True`.

    That means they require a connection from another node. As such, they do not have
    default values. These inputs will only get labels and handles; the user will not be
    able to assign them values directly.
    """
    string_input_1: str = Field(
        description="This is a string input.",
        ui={"label": "I am labelled", "requires_connection": True},
    )
    integer_input_1: int = Field(
        description="This is an integer input.", ui={"requires_connection": True}
    )
    float_input_1: float = Field(
        description="This one is a float.",
        ui={"label": "Float Input", "requires_connection": True},
    )
    image_input_1: ImageField = Field(
        description="And this one is an image.",
        ui={"label": "Image Input", "requires_connection": True},
    )
    boolean_input_1: bool = Field(
        description="Booleans are also valid input types.",
        ui={"label": "Boolean Input", "requires_connection": True},
    )

    """
    This next group of inputs do not have the `"requires_connection": True` UI hint,
    so they will not get handles by default. They require the user to provide a value,
    and need default values set here. They will get labels, handles, and ui inputs.

    They have additional UI hints which affect how their UI is generated, some of which depend
    on their type. Common UI hints include:
    - 'label': The label to display in the UI. If none is provided, one will be inferred from the input property name.
    - 'show_label': Whether or not to have a label in the UI. Defaults to True.
    - 'label_position': Position of the label relative to the UI input component.

    Other ui hints which depend on the type of input field include:
    - 'type': The type of UI element to render for that input, e.g. for integers and floats, options are 'slider' and 'number_input', while for strings the options are 'text' and 'textarea'. If not provided, the app will choose a reasonable default.
    - ''
    """
    string_input_2: str = Field(
        default="This'll be the default value",
        description="This is a string input.",
        ui={"label": "Type in here:", "label_position": "top", "type": "text"},
    )
    integer_input_2: int = Field(
        default=34,
        ge=1,
        le=10,
        description="This is an integer input.",
        ui={"label": "Integer", "with_number_input": True, "with_steppers": True},
    )
    integer_input_3: int = Field(
        default=34,
        ge=0,
        le=100,
        description="This is an integer masquerading as a percentage.",
        ui={"label": "Percentage", "with_filled_track": True, "unit": "%"},
    )
    float_input_2: float = Field(
        default=3.14,
        gt=3,
        lt=4,
        description="This one is a float.",
        ui={
            "label": "Float pls",
            "type": "slider",
            "with_number_display": True,
            "with_slider_marks": True,
        },
    )
    # image_input_2: ImageField = Field(default='', description="And this one is an image.", ui={})
    boolean_input_2: bool = Field(
        default=True, description="Booleans are also valid input types.", ui={}
    )

    """
    Use the Config class to specify Invocation-level UI parameters:
    - 'label' gives the invocation a name, otherwise it is just the class name e.g. ExampleInvocation
    - 'show_in_ui' defaults to true and determines if the UI shows this invocation at all
    """

    class Config:
        schema_extra = {
            "ui": {
                # The label to use in the UI for this invocation.
                "label": "Example Invocation"
            }
        }

    def invoke(
        self, services: InvocationServices, context_id: str
    ) -> ExampleInvocationOutput:
        result_from_processing = {
            string1_out: "string1",
            string2_out: "string2",
            integer_out: 12345,
            float_out: 0.2345,
            image_out: ImageField(uri="test.png"),
            boolean_out: True,
        }

        return ExampleInvocationOutput(
            string1_out=result_from_processing["string1_out"],
            string2_out=result_from_processing["string2_out"],
            integer_out=result_from_processing["integer_out"],
            float_out=result_from_processing["float_out"],
            image_out=result_from_processing["image_out"],
            boolean_out=result_from_processing["boolean_out"],
        )
