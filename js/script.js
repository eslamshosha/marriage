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
  $(".otp-form *:input[type!=hidden]:first").focus();
  let otp_fields = $(".otp-form .otp-field"),
    otp_value_field = $(".otp-form .otp-value");
  otp_fields
    .on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
      let opt_value = "";
      otp_fields.each(function () {
        let field_value = $(this).val();
        if (field_value != "") opt_value += field_value;
      });
      otp_value_field.val(opt_value);
    })
    .on("keyup", function (e) {
      let key = e.keyCode || e.charCode;
      if (key == 8 || key == 46 || key == 37 || key == 40) {
        // Backspace or Delete or Left Arrow or Down Arrow
        $(this).prev().focus();
      } else if (key == 38 || key == 39 || $(this).val() != "") {
        // Right Arrow or Top Arrow or Value not empty
        $(this).next().focus();
      }
    })
    .on("paste", function (e) {
      let paste_data = e.originalEvent.clipboardData.getData("text");
      let paste_data_splitted = paste_data.split("");
      $.each(paste_data_splitted, function (index, value) {
        otp_fields.eq(index).val(value);
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
      $(".page-content-wrapper").toggleClass("active");
      $("body").toggleClass("overflow");
      $(".overlay-box").fadeToggle("500");
    });
    $(".sidebar-close, .overlay-box").click(function () {
      $(".page-sidebar").removeClass("reset-left");
      $(".page-content-wrapper").toggleClass("active");
      $("body").removeClass("overflow");
      $(".overlay-box").fadeToggle("500");
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
$(".custom-file-upload .upload-change").change(function (e) {
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

// var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
//               "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

// var days =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];

//calender
const calenderExists = document.getElementsByClassName("calendar").length > 0;
if (calenderExists) {
  class Calendar {
    constructor() {
      this.monthDiv = document.querySelector(".cal-month__current");
      this.headDivs = document.querySelectorAll(".cal-head__day");
      this.bodyDivs = document.querySelectorAll(".cal-body__day");
      this.nextDiv = document.querySelector(".cal-month__next");
      this.prevDiv = document.querySelector(".cal-month__previous");
    }

    init() {
      var lang;
      if (document.dir == "rtl") {
        lang = "ar-sa";
      } else {
        lang = "en-us";
      }
      moment.locale(lang);

      this.month = moment();
      this.today = this.selected = this.month.clone();
      this.weekDays = moment.weekdaysShort(true);

      this.headDivs.forEach((day, index) => {
        day.innerText = this.weekDays[index];
      });

      this.nextDiv.addEventListener("click", (_) => {
        this.addMonth();
      });
      this.prevDiv.addEventListener("click", (_) => {
        this.removeMonth();
      });

      this.bodyDivs.forEach((day) => {
        day.addEventListener("click", (e) => {
          const date =
            +e.target.childNodes[0].innerHTML < 10
              ? `0${e.target.childNodes[0].innerHTML}`
              : e.target.childNodes[0].innerHTML;

          if (e.target.classList.contains("cal-day__month--next")) {
            this.selected = moment(
              `${this.month.add(1, "month").format("YYYY-MM")}-${date}`
            );
          } else if (e.target.classList.contains("cal-day__month--previous")) {
            this.selected = moment(
              `${this.month.subtract(1, "month").format("YYYY-MM")}-${date}`
            );
          } else {
            this.selected = moment(`${this.month.format("YYYY-MM")}-${date}`);
          }

          this.update();
        });
      });

      this.update();
    }

    update() {
      this.calendarDays = {
        first: this.month.clone().startOf("month").startOf("week").date(),
        last: this.month.clone().endOf("month").date(),
      };

      this.monthDays = {
        lastPrevious: this.month
          .clone()
          .subtract(1, "months")
          .endOf("month")
          .date(),
        lastCurrent: this.month.clone().endOf("month").date(),
      };

      this.monthString = this.month.clone().format("MMMM YYYY");

      this.draw();
    }

    addMonth() {
      this.month.add(1, "month");

      this.update();
    }

    removeMonth() {
      this.month.subtract(1, "month");

      this.update();
    }

    draw() {
      this.monthDiv.innerText = this.monthString;

      let index = 0;

      if (this.calendarDays.first > 1) {
        for (
          let day = this.calendarDays.first;
          day <= this.monthDays.lastPrevious;
          index++
        ) {
          this.bodyDivs[index].innerText = day++;

          this.cleanCssClasses(false, index);

          this.bodyDivs[index].classList.add("cal-day__month--previous");
        }
      }

      let isNextMonth = false;
      for (let day = 1; index <= this.bodyDivs.length - 1; index++) {
        if (day > this.monthDays.lastCurrent) {
          day = 1;
          isNextMonth = true;
        }

        this.cleanCssClasses(true, index);

        if (!isNextMonth) {
          if (
            day === this.today.date() &&
            this.today.isSame(this.month, "day")
          ) {
            this.bodyDivs[index].classList.add("cal-day__day--today");
          }

          if (
            day === this.selected.date() &&
            this.selected.isSame(this.month, "month")
          ) {
            this.bodyDivs[index].classList.add("cal-day__day--selected");
          }

          this.bodyDivs[index].classList.add("cal-day__month--current");
        } else {
          this.bodyDivs[index].classList.add("cal-day__month--next");
        }

        this.bodyDivs[index].innerHTML = `<span>${day++}</span>`;
      }
    }

    cleanCssClasses(selected, index) {
      this.bodyDivs[index].classList.contains("cal-day__month--next") &&
        this.bodyDivs[index].classList.remove("cal-day__month--next");
      this.bodyDivs[index].classList.contains("cal-day__month--previous") &&
        this.bodyDivs[index].classList.remove("cal-day__month--previous");
      this.bodyDivs[index].classList.contains("cal-day__month--current") &&
        this.bodyDivs[index].classList.remove("cal-day__month--current");
      this.bodyDivs[index].classList.contains("cal-day__day--today") &&
        this.bodyDivs[index].classList.remove("cal-day__day--today");
      // if (selected) {
      //   this.bodyDivs[index].classList.contains("cal-day__day--selected") &&
      //     this.bodyDivs[index].classList.remove("cal-day__day--selected");
      // }
    }
  }
  const cal = new Calendar();
  cal.init();
}
