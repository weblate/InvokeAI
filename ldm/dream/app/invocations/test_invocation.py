# Copyright (c) 2022 Kyle Schouviller (https://github.com/kyle0654)

from typing import Literal, Union
from pydantic import Field
from .image import ImageField
from .test_invocation_output import TestInvocationOutput
from .baseinvocation import BaseInvocation
from ..services.invocation_services import InvocationServices


class TestInvocation(BaseInvocation):
    """Just a test."""
    type: Literal['test_invocation'] = 'test_invocation'

    # Inputs
    test: str = Field(description="Inputs do not matter for this invocation", ui={"requires_connection": True})

    # UI hints for Invocation
    ui: dict = {"label": 'Test Invocation'}

    def invoke(self, services: InvocationServices, context_id: str) -> TestInvocationOutput:
        return TestInvocationOutput(
                string1_out     = 'string1',
                string2_out     = 'string2',
                integer_out     = 12345,
                float_out       = 0.2345,
                image_out       = ImageField(uri = 'test.png'),
                boolean_out     = True
        )
