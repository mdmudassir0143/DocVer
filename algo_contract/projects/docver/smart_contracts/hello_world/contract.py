from algopy import ARC4Contract, String
from algopy.arc4 import abimethod

class HelloWorld(ARC4Contract):
    @abimethod()
    def hello(self, name: String) -> String:
        return "Hello, " + name

    @abimethod()
    def adddochash(self, dochash: String) -> None:
        self.global_uint64_simplified = dochash
