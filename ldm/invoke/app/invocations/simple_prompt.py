# Copyright (c) 2022 Kyle Schouviller (https://github.com/kyle0654)

from typing import Literal
from pydantic import Field
from .baseinvocation import BaseInvocation, BaseInvocationOutput
from ..services.invocation_services import InvocationServices


class SimplePromptInvocationOutput(BaseInvocationOutput):
    """Output used by SimplePromptInvocation"""

    type: Literal["simple_prompt_output"] = "simple_prompt_output"

    # Outputs
    prompt: str = Field(description="The prompt to use", ui={"next_to": "prompt"})


class SimplePromptInvocation(BaseInvocation):
    """Provides a plain text prompt."""

    type: Literal["simple_prompt"] = "simple_prompt"

    # Inputs
    prompt: str = Field(
        default="",
        description="The prompt",
        ui={"type": "textarea", "hide_label": True},
    )

    class Config:
        schema_extra = {
            "ui": {
                # The label to use in the UI for this invocation.
                "label": "Simple Prompt"
            }
        }

    def invoke(
        self, services: InvocationServices, session_id: str
    ) -> SimplePromptInvocationOutput:
        return SimplePromptInvocationOutput(prompt=self.prompt)
