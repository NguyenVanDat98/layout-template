import { Calendar, dayjsLocalizer} from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'dayjs/locale/vi';



dayjs.locale('vi');
const localizer = dayjsLocalizer(dayjs)
const messages = {
  allDay: 'Cả ngày',
  previous: 'Trước',
  next: 'Tiếp theo',
  today: 'Hôm nay',
  month: 'Tháng',
  week: 'Tuần',
  day: 'Ngày',
  agenda: 'Lịch',
  date: 'Ngày',
  time: 'Giờ',
  event: 'Sự kiện',
  showMore: (total:any) => `+ Xem thêm ${total} sự kiện`,
  noEventsInRange:"không có sự kiện"
  // Bạn có thể thêm các chuỗi khác tùy ý tại đây.
};

const MyCalendar = (props:any) => (
  <div>
    <Calendar
    onSelectEvent={(e)=>{
      console.log(e);
    }}
    onSelectSlot={(e)=>{
      console.log(e);
    }}
    onSelecting={(e)=>{
      console.log(e);
      return true;
    }}
    onView={(e)=>{
console.log(e);
    }}
      localizer={localizer}
      startAccessor="start"
      events={[]}
      endAccessor="end"
      style={{ height: 500 }}
      messages={messages}
      popup
      
    />
  </div>
)
export default MyCalendar