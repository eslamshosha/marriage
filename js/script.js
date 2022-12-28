let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  new WOW().init();

  //otp code animation
  $(".digit-group")
    .find("input")
    .each(function () {
      $(this).attr("maxlength", 1);
      $(this).on("keyup", function (e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find("input#" + $(this).data("previous"));

          if (prev.length) {
            $(prev).select();
          }
        } else if (
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 65 && e.keyCode <= 90) ||
          (e.keyCode >= 96 && e.keyCode <= 105) ||
          e.keyCode === 39
        ) {
          var next = parent.find("input#" + $(this).data("next"));

          if (next.length) {
            $(next).select();
          } else {
            if (parent.data("autosubmit")) {
              parent.submit();
            }
          }
        }
      });
    });
  //otp timer
  const classExists =
    document.getElementsByClassName("countDown-cont").length > 0;
  if (classExists) {
    function countdown() {
      var seconds = 59;
      function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else {
          // document.getElementById("counter").innerHTML = "";
        }
      }
      tick();
    }
    countdown();
  }

  //dashboard
  //phone size menu onclick
  if ($(window).width() <= 1199) {
    $("#menu-id").click(function (e) {
      e.preventDefault();
      $(".page-sidebar").toggleClass("reset-left");
      $("body").toggleClass("overflow");
      $(".menu-bars .bars").toggleClass("open-bars");
      $(".menu-bars .bars").toggleClass("close-bars");
    });
    $(".nav-head .close-btn").click(function () {
      $(".page-sidebar").removeClass("reset-left");
      $(".menu-bars .bars").toggleClass("open-bars");
      $(".menu-bars .bars").toggleClass("close-bars");
      $("body").removeClass("overflow");
    });
  }
  //sidebar collpase
  $(".logged-drop").on("click", function () {
    $(".logged-content").toggleClass("open");
    $(".overlay-box2").fadeToggle("500");
  });
  $(".overlay-box2").on("click", function () {
    $(".logged-content").removeClass("open");
    $(".overlay-box2").fadeToggle("500");
  });
  $(".drop-link span").click(function (e) {
    e.preventDefault();
  });
});
//wizard form
const checkButtons = (activeStep, stepsCount) => {
  const prevBtn = $("#wizard-prev");
  const nextBtn = $("#wizard-next");
  const submBtn = $("#wizard-subm");

  switch (activeStep / stepsCount) {
    case 0: // First Step
      prevBtn.hide();
      submBtn.hide();
      nextBtn.show();
      break;
    case 1: // Last Step
      nextBtn.hide();
      prevBtn.show();
      submBtn.show();
      break;
    case 4: // Last Step
      nextBtn.hide();
      prevBtn.hide();
      submBtn.hide();
      break;
    default:
      submBtn.hide();
      prevBtn.show();
      nextBtn.show();
  }
};

// Scrolling the form to the middle of the screen if the form
// is taller than the viewHeight
const scrollWindow = (activeStepHeight, viewHeight) => {
  if (viewHeight < activeStepHeight) {
    $(window).scrollTop($(steps[activeStep]).offset().top - viewHeight / 2);
  }
};

// Setting the wizard body height, this is needed because
// the steps inside of the body have position: absolute
const setWizardHeight = (activeStepHeight) => {
  $(".wizard-body").height(activeStepHeight);
};

$(function () {
  // Form step counter (little cirecles at the top of the form)
  const wizardSteps = $(".wizard-header .wizard-step li");
  // Form steps (actual steps)
  const steps = $(".wizard-body .step");
  // Number of steps (counting from 0)
  const stepsCount = steps.length - 2;
  // Screen Height
  const viewHeight = $(window).height();
  // Current step being shown (counting from 0)
  let activeStep = 0;
  // Height of the current step
  let activeStepHeight = $(steps[activeStep]).height();

  checkButtons(activeStep, stepsCount);
  setWizardHeight(activeStepHeight);

  // Resizing wizard body when the viewport changes
  $(window).resize(function () {
    setWizardHeight($(steps[activeStep]).height());
  });
  const current = $(".page-container .register-link");
  // Previous button handler
  $("#wizard-prev").click(() => {
    // Sliding out current step
    $(steps[activeStep]).removeClass("active");
    // $(wizardSteps[activeStep]).removeClass("active");
    $(wizardSteps[activeStep]).prev("li").removeClass("active");
    // console.log(activeStep);
    activeStep == 1 ? current.show() : false;
    activeStep--;

    // Sliding in previous Step
    $(steps[activeStep]).removeClass("off").addClass("active");
    // $(wizardSteps[activeStep]).prev("li").removeClass("active");

    activeStepHeight = $(steps[activeStep]).height();
    setWizardHeight(activeStepHeight);
    checkButtons(activeStep, stepsCount);
  });

  // Next button handler
  $("#wizard-next").click(() => {
    // Sliding out current step
    $(steps[activeStep])
      .removeClass("inital")
      .addClass("off")
      .removeClass("active");
    // $(wizardSteps[activeStep]).removeClass("active");
    current.hide();
    // Next step
    activeStep++;

    // Sliding in next step
    $(steps[activeStep]).addClass("active");
    $(wizardSteps[activeStep]).prev("li").addClass("active");

    activeStepHeight = $(steps[activeStep]).height();
    setWizardHeight(activeStepHeight);
    checkButtons(activeStep, stepsCount);
  });
  // button submit handler
  $("#wizard-subm").click(() => {
    // Sliding out current step
    $(steps[activeStep])
      .removeClass("inital")
      .addClass("off")
      .removeClass("active");
    // $(wizardSteps[activeStep]).removeClass("active");
    current.hide();
    // Next step
    activeStep++;

    // Sliding in next step
    $(steps[activeStep]).addClass("active");
    $(wizardSteps[activeStep]).prev("li").addClass("active");
    $(wizardSteps[activeStep]).addClass("active");

    activeStepHeight = $(steps[activeStep]).height();
    setWizardHeight(activeStepHeight);
    checkButtons(activeStep, stepsCount);
    $("#wizard-prev").hide();
    $("#wizard-next").hide();
  });
});
const selectExists = document.getElementsByClassName("select_input").length > 0;
if (selectExists) {
  const $select2 = $(".select_input");
  $select2.select2();
}
//showPass
function showPass(showPass) {
  sibling = showPass.parentElement.nextElementSibling;
  sibling.focus();
  if (showPass.checked) {
    sibling.setAttribute("type", "text");
  } else {
    sibling.setAttribute("type", "password");
  }
}
//file input
$(".custom-file-upload .upload-change").change(function (e) 
{
  let file_val;
  if ($(this).val() == "") {
    file_val = $(".file-txt").data("title");
  } else {
    file_val = $(this).prop("files")[0].name;
  }
  $(this).siblings(".file-txt").html(file_val);
});
const dateExists = document.getElementsByClassName("selector").length > 0;
if (dateExists) {
  // commonjs // flatpicker date input
  $(".selector").flatpickr({});
  //flatpicker for events page to dispaly today
  $(".select-date").flatpickr({
    minDate: "today",
    maxDate: new Date().fp_incr(14), // 14 days from now
    defaultDate: "today",
  });
}
