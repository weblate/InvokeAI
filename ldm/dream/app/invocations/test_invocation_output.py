from typing import Literal
from pydantic.fields import Field
from .image import ImageField
from .baseinvocation import BaseInvocationOutput

class TestInvocationOutput(BaseInvocationOutput):
    """Output used by TestInvocation"""
    type: Literal['test_invocation'] = 'test_invocation'

    string1_out: str = Field(default=None, description="The first string output")
    string2_out: str = Field(default=None, description="The second string output")
    integer_out: int = Field(default=None, description="An integer output")
    float_out: float = Field(default=None, description="The output float")
    image_out: ImageField = Field(default=None, description="The output image")
    boolean_out: bool = Field(default=None, description="An output boolean")
