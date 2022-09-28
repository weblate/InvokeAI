# Copyright (c) 2022 Kyle Schouviller (https://github.com/kyle0654)

from typing import Literal
from pydantic import Field
from .baseinvocation import BaseInvocation, BaseInvocationOutput
from ..services.invocation_services import InvocationServices


class SimplePromptInvocation(BaseInvocation):
    """Provides a plain text prompt."""
    type: Literal["simple_prompt"]

    # Inputs
    prompt: str = Field(default="", description="The prompt", ui={"type": "textarea", "label_position": "top"})

    # UI hints for Invocation
    ui: dict = {"label": 'Simple Prompt'}

    class Outputs(BaseInvocationOutput):
        prompt: str = Field(ui={"next_to": "prompt"})

    def invoke(self, services: InvocationServices, context_id: str) -> Outputs:
        return SimplePromptInvocation.Outputs.construct(
            prompt = self.prompt
        )
