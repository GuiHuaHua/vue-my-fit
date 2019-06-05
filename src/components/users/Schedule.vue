<template>
  <div id="calendar">

  </div>
</template>
<style>
  body {
    margin: 40px 10px;
    padding: 0;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  #calendar {
    max-width: 900px;
    margin: 0 auto;
  }

</style>
<script>
  import "../../../static/css/fullcalendar.css";

  let FullCalendar = require('fullcalendar')
  export default {
    data() {
      return {
        eventList: {}
      }
    },
    mounted() {
      let sf = this;
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: this.getCurrentDate(),
        navLinks: true, // can click day/week names to navigate views
        locale: 'zh-cn',
        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',
        currentTimezone: 'Asia/Tokyo',
        /*businessHours: true,*/

        selectable: true,
        selectHelper: true,
        select: function (start, end) {
          let title = prompt('描述:');
          let eventData;
          if (title) {
            eventData = {
              title: title,
              start: start,
              end: end
            };
            let startTime = start.toISOString().replace("T"," ");
            let endTime = end.toISOString().replace("T"," ");
            let param = sf.$qs.stringify({start: startTime, end: endTime,title:title});

            // 查询该时间段是否有事件
            // 若没有，保存到数据库
            // 若有，弹出提示
            let success = (response) => {
              if (response.data.code == -1) {
                sf.$message.error("该时间段已被占用！");
              } else {
                sf.$utils.axiosMethod({
                  method: "post",
                  url: sf.baseUrl + "/event/insertEvent",
                  data: param
                });
                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true

              }
            }

            sf.$utils.axiosMethod({
              method: "get",
              url: sf.baseUrl + "/event/checkIfOccupied",
              params: {start: startTime, end: endTime,title:title},
              callback: success
            });
          }
          $('#calendar').fullCalendar('unselect');
        },
        eventDrop: function(calEvent, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
          let eventId = calEvent.eventId;
          let start = calEvent.start.toISOString().replace("T"," ");
          let end = calEvent.start.toISOString().replace("T"," ");
          let param = sf.$qs.stringify({start: start, end: end,eventId:eventId});
          let success = (response) => {
            if (response.data.code == -1) {
              sf.$message.error("该时间段已被占用！");
            } else {
              sf.$utils.axiosMethod({
                method: "post",
                url: sf.baseUrl + "/event/updateEvent",
                data: param
              });
            }
          }

          sf.$utils.axiosMethod({
            method: "get",
            url: sf.baseUrl + "/event/checkIfOccupied",
            params: {start: startTime, end: endTime,title:title},
            callback: success
          });
          debugger;
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events,

        events: {
          url: sf.baseUrl + '/event/selectByUser?userId=1'
        }
      });
    },
    methods: {
      getCurrentDate() {
        return this.$utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      }
    }
  }

</script>
