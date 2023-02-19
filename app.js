$(document).ready(function () {
  const root = $("#root");
  const screen = newElement("div").attr("id", "screen").appendTo(root);

  newElement("div").attr("id", "expr").appendTo(screen);
  newElement("div").attr("id", "result").appendTo(screen);

  const clrButtons = newElement("div").appendTo(root).addClass("clrBtns");

  const btnContainer = newElement("div")
    .appendTo(root)
    .attr("id", "btnContainer");

  const buttons = newElement("div").appendTo(btnContainer).addClass("buttons");
  const opButtons = newElement("div").appendTo(btnContainer).addClass("opBtns");

  for (let i = 1; i < 10; i++) {
    numButton(i).appendTo(buttons);
  }

  numButton(".").attr("id", "dotBtn").appendTo(buttons);
  numButton(0).appendTo(buttons);
  numButton("+").attr("id", "plusBtn").appendTo(opButtons);
  numButton("-").attr("id", "minusBtn").appendTo(opButtons);
  numButton("*").attr("id", "mulBtn").appendTo(opButtons);
  numButton("/").attr("id", "divBtn").appendTo(opButtons);

  newElement("button")
    .text("=")
    .attr("id", "eqBtn")
    .click(onEqPress)
    .appendTo(buttons);

  newElement("button")
    .text("Clear")
    .addClass("clrBtn")
    .click(onClearPress)
    .appendTo(clrButtons);

  newElement("button")
    .text("Clear All")
    .addClass("clrBtn")
    .click(onClearAllPress)
    .appendTo(clrButtons);

  $(this).keydown(function (event) {
    const char = event.key;
    if ("0123456789.+-*/".split("").includes(char)) {
      onCharPress(char);
    } else if (char === "=" || char === "Enter") {
      onEqPress();
    } else if (char === "Backspace") {
      onClearPress();
    } else if (char === "Escape") {
      onClearAllPress();
    }
  });
});

const newElement = (tagName) => $(`<${tagName}></${tagName}>`);

function onEqPress() {
  let result;
  try {
    result = Math.round(eval($("#expr").text()) * 10e6) / 10e6;
  } catch (error) {
    console.log(error);
    result = "ERROR";
  }
  $("#result").text(result);
}

const onCharPress = (character) => {
  $("#expr").append(character);
};

const onClearAllPress = () => {
  $("#expr, #result").text("");
};

const onClearPress = () => {
  const prev = $("#expr").text();
  $("#expr").text(prev.slice(0, -1));
};

const numButton = (character) =>
  newElement("button")
    .text(character)
    .addClass("numBtn")
    .click(() => onCharPress(character));
