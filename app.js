const { useState, useEffect } = React;

// Default schedule template
const DEFAULT_SCHEDULE = {
  mon: [
    { time: '7:00 AM', activity: '☀️ Wake & breakfast', type: 'morning' },
    { time: '8:00 AM', activity: '🎒 School', type: 'school' },
    { time: '3:00 PM', activity: '✏️ Homework', type: 'homework' },
    { time: '4:30 PM', activity: '⚽ Soccer practice', type: 'soccer' },
    { time: '5:30 - 6:30 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'mon' },
    { time: '6:00 PM', activity: '🍽️ Dinner', type: 'evening' },
    { time: '9:00 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  tue: [
    { time: '7:00 AM', activity: '☀️ Wake & breakfast', type: 'morning' },
    { time: '8:00 AM', activity: '🎒 School', type: 'school' },
    { time: '3:00 PM', activity: '✏️ Homework', type: 'homework' },
    { time: '4:00 PM', activity: '🎹 Piano lesson', type: 'piano' },
    { time: '5:00 - 6:00 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'tue' },
    { time: '6:00 PM', activity: '🍽️ Dinner', type: 'evening' },
    { time: '9:00 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  wed: [
    { time: '7:00 AM', activity: '☀️ Wake & breakfast', type: 'morning' },
    { time: '8:00 AM', activity: '🎒 School', type: 'school' },
    { time: '3:00 PM', activity: '⚽ Soccer practice', type: 'soccer' },
    { time: '5:00 PM', activity: '✏️ Homework', type: 'homework' },
    { time: '6:00 - 7:00 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'wed' },
    { time: '7:00 PM', activity: '📺 Family time', type: 'free' },
    { time: '9:00 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  thu: [
    { time: '7:00 AM', activity: '☀️ Wake & breakfast', type: 'morning' },
    { time: '8:00 AM', activity: '🎒 School', type: 'school' },
    { time: '3:00 PM', activity: '✏️ Homework', type: 'homework' },
    { time: '4:00 PM', activity: '💃 Dance class', type: 'dance' },
    { time: '5:30 - 6:30 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'thu' },
    { time: '6:00 PM', activity: '🍽️ Dinner', type: 'evening' },
    { time: '9:00 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  fri: [
    { time: '7:00 AM', activity: '☀️ Wake & breakfast', type: 'morning' },
    { time: '8:00 AM', activity: '🎒 School', type: 'school' },
    { time: '3:00 PM', activity: '🎉 Free afternoon!', type: 'free' },
    { time: '4:00 - 5:00 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'fri' },
    { time: '6:00 PM', activity: '🍕 Pizza night', type: 'evening' },
    { time: '7:00 PM', activity: '🎬 Movie night', type: 'free' },
    { time: '9:30 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  sat: [
    { time: '8:30 AM', activity: '☀️ Sleep in!', type: 'morning' },
    { time: '9:00 AM', activity: '🥞 Big breakfast', type: 'morning' },
    { time: '10:00 AM', activity: '⚽ Soccer game', type: 'soccer' },
    { time: '12:00 PM', activity: '🌟 Fun time!', type: 'free' },
    { time: '2:00 - 3:00 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'sat' },
    { time: '6:00 PM', activity: '🍽️ Dinner', type: 'evening' },
    { time: '9:30 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
  sun: [
    { time: '8:30 AM', activity: '☀️ Wake up', type: 'morning' },
    { time: '10:00 AM', activity: '👨‍👩‍👧 Family activity', type: 'free' },
    { time: '12:00 PM', activity: '🍽️ Lunch', type: 'evening' },
    { time: '2:00 PM', activity: '✏️ Get ready for week', type: 'homework' },
    { time: '3:00 - 4:00 PM', activity: '✏️ Open - pick a to-do!', type: 'flexible', key: 'sun' },
    { time: '6:00 PM', activity: '🍽️ Dinner', type: 'evening' },
    { time: '9:00 PM', activity: '🌙 Bedtime', type: 'sleep' },
  ],
};

// Common emoji options for activities
const EMOJI_OPTIONS = [
  '☀️', '🌙', '🎒', '✏️', '📚', '🎨', '🧹', '⚽', '🎹', '💃', '🍽️', '🍕', '🍔',
  '🎬', '📺', '🎮', '🧩', '🎯', '🏃', '🚴', '🏊', '🧘', '🤸', '🎪', '🎭', '🎵',
  '📖', '✍️', '🖍️', '🌈', '🌺', '🌻', '🌸', '🦋', '🐶', '🐱', '🐢', '🦁', '🧚',
  '👑', '🎁', '🎉', '🎊', '⭐', '🌟', '✨', '💫', '🔥', '❄️', '💧', '🌊', '🏖️'
];

// Icon picker component
const IconPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  return React.createElement('div', { className: 'relative' },
    React.createElement('button', {
      onClick: () => setShowPicker(!showPicker),
      className: 'text-4xl p-2 hover:scale-110 transition-transform cursor-pointer'
    }, value || '🎯'),
    
    showPicker && React.createElement('div', { 
      className: 'absolute bottom-full left-0 bg-white border-2 border-purple-400 rounded-lg p-3 grid grid-cols-6 gap-2 shadow-lg z-50 mb-2',
      style: { maxHeight: '200px', overflowY: 'auto', width: '200px' }
    },
      EMOJI_OPTIONS.map(emoji =>
        React.createElement('button', {
          key: emoji,
          onClick: () => {
            onChange(emoji);
            setShowPicker(false);
          },
          className: 'text-2xl p-1 hover:bg-purple-100 rounded transition-colors'
        }, emoji)
      )
    )
  );
};

// Settings page component
const SettingsPage = ({ schedule, onScheduleChange, dayNames, onClose }) => {
  const [selectedDay, setSelectedDay] = useState('mon');
  
  const currentDaySchedule = schedule[selectedDay] || [];
  
  const updateActivity = (index, field, value) => {
    const updated = [...currentDaySchedule];
    updated[index] = { ...updated[index], [field]: value };
    onScheduleChange({ ...schedule, [selectedDay]: updated });
  };
  
  const deleteActivity = (index) => {
    const updated = currentDaySchedule.filter((_, i) => i !== index);
    onScheduleChange({ ...schedule, [selectedDay]: updated });
  };
  
  const addActivity = () => {
    const updated = [...currentDaySchedule, { 
      time: '12:00 PM', 
      activity: '🎯 New activity', 
      type: 'free',
      key: selectedDay 
    }];
    onScheduleChange({ ...schedule, [selectedDay]: updated });
  };
  
  const resetDay = () => {
    if (window.confirm(`Reset ${dayNames[selectedDay]} to default schedule?`)) {
      onScheduleChange({ ...schedule, [selectedDay]: DEFAULT_SCHEDULE[selectedDay] });
    }
  };
  
  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 p-4 md:p-8' },
    React.createElement('div', { className: 'max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8' },
      React.createElement('div', { className: 'flex items-center justify-between mb-6' },
        React.createElement('h1', { className: 'text-4xl font-bold text-blue-600' }, '⚙️ Settings'),
        React.createElement('button', {
          onClick: onClose,
          className: 'text-2xl px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-bold'
        }, '✕')
      ),
      
      React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Customize your weekly schedule. Select a day and edit the activities.'),
      
      // Day selector
      React.createElement('div', { className: 'flex gap-2 justify-center mb-8 flex-wrap' },
        Object.keys(dayNames).map(day =>
          React.createElement('button', {
            key: day,
            onClick: () => setSelectedDay(day),
            className: `px-3 py-2 rounded-lg font-bold transition-all text-sm ${selectedDay === day ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`
          }, dayNames[day].slice(0, 3))
        )
      ),
      
      React.createElement('h2', { className: 'text-2xl font-bold text-blue-600 mb-4' }, `${dayNames[selectedDay]}'s Schedule`),
      
      // Activities list
      React.createElement('div', { className: 'space-y-4 mb-6' },
        currentDaySchedule.map((item, idx) =>
          React.createElement('div', { key: idx, className: 'bg-gray-50 p-4 rounded-lg border-2 border-blue-300' },
            React.createElement('div', { className: 'flex gap-3 items-start' },
              React.createElement('div', { className: 'flex-1 space-y-2' },
                React.createElement('div', null,
                  React.createElement('label', { className: 'text-sm font-bold text-gray-600' }, 'Time'),
                  React.createElement('input', {
                    type: 'time',
                    value: item.time.match(/\d{1,2}:\d{2}/) ? item.time.match(/\d{1,2}:\d{2}/)[0] : '',
                    onChange: (e) => {
                      // Keep AM/PM if present, otherwise just set time
                      const ampm = item.time.match(/AM|PM/);
                      updateActivity(idx, 'time', e.target.value + (ampm ? ' ' + ampm[0] : ''));
                    },
                    className: 'w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                  })
                ),
                React.createElement('div', null,
                  React.createElement('label', { className: 'text-sm font-bold text-gray-600' }, 'Activity'),
                  React.createElement('div', { className: 'flex gap-2 items-center' },
                    React.createElement('input', {
                      type: 'text',
                      value: item.activity,
                      onChange: (e) => updateActivity(idx, 'activity', e.target.value),
                      placeholder: 'Activity name with emoji',
                      className: 'flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                    }),
                    React.createElement(IconPicker, {
                      value: item.activity.charAt(0),
                      onChange: (emoji) => {
                        const text = item.activity.replace(/^[^\s]/, emoji);
                        updateActivity(idx, 'activity', text);
                      }
                    })
                  )
                )
              ),
              React.createElement('button', {
                onClick: () => deleteActivity(idx),
                className: 'text-red-500 hover:text-red-700 font-bold text-xl'
              }, '🗑️')
            )
          )
        )
      ),
      
      // Action buttons
      React.createElement('div', { className: 'flex gap-2 justify-between' },
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', {
            onClick: addActivity,
            className: 'px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold'
          }, '➕ Add Activity'),
          React.createElement('button', {
            onClick: resetDay,
            className: 'px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold'
          }, '🔄 Reset Day')
        ),
        React.createElement('button', {
          onClick: onClose,
          className: 'px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold'
        }, 'Done')
      )
    )
  );
};

const KidsSchedulePWA = () => {
  const [mainView, setMainView] = useState('schedule'); // 'schedule' or 'settings'
  const [view, setView] = useState('grid');
  const [selectedDay, setSelectedDay] = useState('mon');
  const [todos, setTodos] = useState([
    { id: 1, text: '📚 Read 3 chapters for book report', completed: false },
    { id: 2, text: '🧹 Clean out backpack', completed: false },
    { id: 3, text: '✏️ Practice spelling words', completed: false },
    { id: 4, text: '🎨 Finish art project', completed: false },
    { id: 5, text: '🧺 Put away clean laundry', completed: false },
    { id: 6, text: '📞 Call grandma', completed: false },
    { id: 7, text: '🎮 Organize game collection', completed: false },
    { id: 8, text: '🌱 Water the plants', completed: false },
  ]);
  const [flexibleSlots, setFlexibleSlots] = useState({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: ''
  });
  const [weekSchedule, setWeekSchedule] = useState(DEFAULT_SCHEDULE);
  const [newTodoText, setNewTodoText] = useState('');
  const [draggedTodoId, setDraggedTodoId] = useState(null);
  const [todoDropdown, setTodoDropdown] = useState(null);

  // Assign todo to selected flexible slot
  const assignTodoToSlot = (todo, day, slot) => {
    setWeekSchedule(prev => {
      const updated = { ...prev };
      updated[day] = updated[day].map(s =>
        s === slot ? { ...s, activity: todo.text, type: 'assigned', todoId: todo.id } : s
      );
      return updated;
    });
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  // Unassign a previously-assigned todo from a slot and return it to the todos list
  const unassignSlot = (day, slotIndex) => {
    setWeekSchedule(prev => {
      const updated = { ...prev };
      const slot = updated[day][slotIndex];
      if (!slot || !slot.todoId) return prev;

      // Recreate the todo item from the slot and add it back to the list
      const restoredTodo = { id: slot.todoId, text: slot.activity, completed: false };
      setTodos(prevTodos => {
        // Avoid duplicate ids: if an id already exists, give the restored item a new id
        const exists = prevTodos.find(t => t.id === restoredTodo.id);
        return [...prevTodos, exists ? { ...restoredTodo, id: Date.now() } : restoredTodo];
      });

      // Reset the slot back to a flexible open slot
      updated[day] = updated[day].map((s, i) => i === slotIndex ? { ...s, activity: '✏️ Open - pick a to-do!', type: 'flexible', todoId: undefined } : s);
      return updated;
    });
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('kidsTodos') || '[]');
    const savedSlots = JSON.parse(localStorage.getItem('kidsFlexibleSlots') || '{}');
    const savedSchedule = JSON.parse(localStorage.getItem('kidsSchedule') || 'null');
    
    if (savedTodos.length > 0) setTodos(savedTodos);
    if (Object.keys(savedSlots).length > 0) setFlexibleSlots(savedSlots);
    if (savedSchedule) setWeekSchedule(savedSchedule);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('kidsTodos', JSON.stringify(todos));
  }, [todos]);

  // Save flexible slots to localStorage
  useEffect(() => {
    localStorage.setItem('kidsFlexibleSlots', JSON.stringify(flexibleSlots));
  }, [flexibleSlots]);

  // Save schedule to localStorage
  useEffect(() => {
    localStorage.setItem('kidsSchedule', JSON.stringify(weekSchedule));
  }, [weekSchedule]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodoText.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodoText, 
        completed: false 
      }]);
      setNewTodoText('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateFlexibleSlot = (day, value) => {
    setFlexibleSlots({ ...flexibleSlots, [day]: value });
  };

  const handleTodoDragStart = (todoId) => {
    setDraggedTodoId(todoId);
  };

  const handleTodoDragEnd = () => {
    setDraggedTodoId(null);
  };

  const handleSlotDrop = (day) => {
    if (draggedTodoId !== null) {
      const draggedTodo = todos.find(t => t.id === draggedTodoId);
      if (draggedTodo) {
        updateFlexibleSlot(day, draggedTodo.text);
        setDraggedTodoId(null);
      }
    }
  };

  const dayNames = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };

  const getActivityColor = (type) => {
    const colors = {
      morning: 'bg-yellow-100 border-l-4 border-yellow-500',
      school: 'bg-blue-100 border-l-4 border-blue-500',
      homework: 'bg-purple-100 border-l-4 border-purple-500',
      soccer: 'bg-green-200 border-l-4 border-green-600',
      piano: 'bg-purple-200 border-l-4 border-purple-600',
      dance: 'bg-pink-200 border-l-4 border-pink-600',
      free: 'bg-pink-100 border-l-4 border-pink-500',
      evening: 'bg-orange-100 border-l-4 border-orange-500',
      sleep: 'bg-indigo-100 border-l-4 border-indigo-500',
      flexible: 'bg-green-50 border-2 border-dashed border-green-500',
      assigned: 'bg-green-100 border-2 border-green-500'
    };
    return colors[type] || 'bg-gray-100';
  };

  // Print only the schedule area (opens a new window with the schedule markup & Tailwind)
  const printSchedule = () => {
    const el = document.getElementById('schedule-area');
    if (!el) {
      alert('Schedule element not found to print.');
      return;
    }
    const w = window.open('', '_blank', 'scrollbars=yes,resizable=yes');
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Print Schedule</title><script src="https://cdn.tailwindcss.com"></script></head><body class="p-6 bg-white">${el.outerHTML}</body></html>`;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    // Give it a moment to load Tailwind then print
    setTimeout(() => { try { w.print(); } catch (e) { console.error(e); } }, 600);
  };

  if (mainView === 'settings') {
    return React.createElement(SettingsPage, {
      schedule: weekSchedule,
      onScheduleChange: setWeekSchedule,
      dayNames: dayNames,
      onClose: () => setMainView('schedule')
    });
  }

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-4 md:p-8' },
    React.createElement('div', { className: 'max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8' },
      React.createElement('div', { className: 'text-center mb-8 flex items-center justify-between' },
        React.createElement('h1', { className: 'text-4xl md:text-5xl font-bold text-purple-600 flex-1 text-center' }, '📅 My Weekly Schedule'),
        React.createElement('div', { className: 'flex gap-2 items-center' },
          React.createElement('button', {
            onClick: () => setMainView('settings'),
            className: 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold'
          }, '⚙️ Settings'),
          React.createElement('button', {
            onClick: printSchedule,
            className: 'px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold'
          }, '🖨️ Print Schedule')
        )
      ),
      React.createElement('p', { className: 'text-gray-600 text-lg text-center mb-8' }, 'Each day is different - here\'s what happens!'),

      // Schedule wrapper that will be printed
      React.createElement('div', { id: 'schedule-area' },
        React.createElement('div', { className: 'flex gap-3 justify-center mb-8 flex-wrap' },
          React.createElement('button', {
            onClick: () => setView('grid'),
            className: `px-6 py-3 rounded-xl font-bold text-lg transition-all ${view === 'grid' ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`
          }, '📊 See Whole Week'),
          React.createElement('button', {
            onClick: () => setView('single'),
            className: `px-6 py-3 rounded-xl font-bold text-lg transition-all ${view === 'single' ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`
          }, '📱 One Day at a Time')
        ),

        view === 'grid' && React.createElement('div', {
          className: 'flex gap-6 overflow-x-auto pb-4 -mx-6 px-6',
          style: { scrollSnapType: 'x mandatory' }
        },
          Object.entries(weekSchedule).map(([day, activities]) =>
            React.createElement('div', {
              key: day,
              className: 'bg-gray-50 rounded-xl p-4 shadow-md flex-shrink-0 min-w-[260px] flex flex-col',
              style: { scrollSnapAlign: 'center' }
            },
              React.createElement('div', { className: `${day === 'sat' || day === 'sun' ? 'bg-green-500' : 'bg-purple-600'} text-white p-3 rounded-lg text-center font-bold text-lg mb-4 w-full` }, dayNames[day]),
              activities.map((item, idx) =>
                React.createElement('div', { key: idx, className: `${getActivityColor(item.type)} p-3 mb-2 rounded-lg w-full flex items-center justify-between` },
                  React.createElement('div', { className: 'font-bold text-purple-700 text-sm' }, item.time),
                  React.createElement('div', {
                    className: 'text-sm mt-1 flex-1 text-center',
                    onDragOver: (e) => e.preventDefault(),
                    onDrop: item.type === 'flexible' ? () => handleSlotDrop(item.key) : undefined
                  },
                    item.type === 'flexible'
                      ? React.createElement('input', {
                          type: 'text',
                          value: flexibleSlots[item.key] || '',
                          onChange: (e) => updateFlexibleSlot(item.key, e.target.value),
                          placeholder: 'Type a to-do here or drag one from above...',
                          className: 'w-full bg-white border border-green-400 rounded px-2 py-1 text-xs focus:outline-none focus:border-green-600 cursor-pointer'
                        })
                      : (
                        item.type === 'assigned'
                          ? React.createElement('div', { className: 'flex items-center justify-center gap-2' },
                              React.createElement('span', null, item.activity),
                              React.createElement('button', {
                                onClick: () => unassignSlot(day, idx),
                                className: 'text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded'
                              }, '↩️ Unassign')
                            )
                          : item.activity
                      )
                  )
                )
              )
            )
          )
        ),

        view === 'single' && React.createElement('div', null,
          React.createElement('div', { className: 'flex gap-2 justify-center mb-6 flex-wrap' },
            Object.keys(dayNames).map(day =>
              React.createElement('button', {
                key: day,
                onClick: () => setSelectedDay(day),
                className: `px-4 py-2 rounded-lg font-bold transition-all ${selectedDay === day ? 'bg-purple-600 text-white' : 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-100'}`
              }, dayNames[day])
            )
          ),
          React.createElement('h2', { className: 'text-3xl font-bold text-purple-600 text-center mb-6' }, dayNames[selectedDay]),
          React.createElement('div', { className: 'space-y-3' },
            weekSchedule[selectedDay].map((item, idx) =>
              React.createElement('div', { 
                key: idx, 
                className: `${getActivityColor(item.type)} p-4 rounded-xl flex items-center gap-4`,
                onDragOver: item.type === 'flexible' ? (e) => e.preventDefault() : undefined,
                onDrop: item.type === 'flexible' ? () => handleSlotDrop(item.key) : undefined
              },
                React.createElement('div', { className: 'font-bold text-purple-700 min-w-[140px]' }, item.time),
                React.createElement('div', { className: 'flex-1' },
                  item.type === 'flexible'
                    ? React.createElement('input', {
                        type: 'text',
                        value: flexibleSlots[item.key] || '',
                        onChange: (e) => updateFlexibleSlot(item.key, e.target.value),
                        placeholder: 'Type a to-do item here or drag one from the list above...',
                        className: 'w-full bg-white border-2 border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600'
                      })
                    : (
                      item.type === 'assigned'
                        ? React.createElement('div', { className: 'flex items-center justify-between' },
                            React.createElement('div', { className: 'text-lg' }, item.activity),
                            React.createElement('button', {
                              onClick: () => unassignSlot(selectedDay, idx),
                              className: 'ml-4 text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded'
                            }, '↩️ Unassign')
                          )
                        : React.createElement('div', { className: 'text-lg' }, item.activity)
                    )
                )
              )
            )
          )
        )
      ),
      
      // Move the todo list below the schedule
      React.createElement('div', { className: 'bg-yellow-50 border-4 border-dashed border-yellow-400 rounded-2xl p-6 mb-8' },
        React.createElement('h2', { className: 'text-2xl font-bold text-purple-600 mb-2' }, '📝 This Week\'s To-Do Items'),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Check them off when done, or fill them into the open time slots!'),
        
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-3 mb-4' },
          todos.map(todo =>
            React.createElement('div', {
              key: todo.id,
              draggable: true,
              onDragStart: () => handleTodoDragStart(todo.id),
              onDragEnd: handleTodoDragEnd,
              className: `bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow cursor-grab ${draggedTodoId === todo.id ? 'opacity-50 bg-purple-100' : ''}`
            },
              React.createElement('button', { onClick: () => toggleTodo(todo.id), className: 'flex-shrink-0' },
                todo.completed ? '✅' : '⬜'
              ),
              React.createElement('span', {
                className: todo.completed ? 'flex-1 line-through text-gray-400' : 'flex-1 text-gray-800',
                onClick: () => setTodoDropdown(todo.id)
              }, todo.text),
              React.createElement('button', { onClick: () => deleteTodo(todo.id), className: 'text-red-500 hover:text-red-700' }, '🗑️'),
              todoDropdown === todo.id && React.createElement('div', {
                className: 'absolute z-10 bg-white border border-purple-300 rounded-lg shadow-lg mt-2 p-2',
                style: { minWidth: '200px' }
              },
                React.createElement('div', { className: 'font-bold mb-2 text-purple-600' }, 'Assign to time slot:'),
                Object.entries(weekSchedule).map(([day, slots]) =>
                  slots.filter(slot => slot.type === 'flexible').map((slot, idx) =>
                    React.createElement('div', {
                      key: day + idx,
                      className: 'mb-1',
                    },
                      React.createElement('button', {
                        className: 'w-full text-left px-2 py-1 rounded hover:bg-purple-100',
                        onClick: () => {
                          assignTodoToSlot(todo, day, slot);
                          setTodoDropdown(null);
                        }
                      }, `${dayNames[day]}: ${slot.time}`)
                    )
                  )
                ),
                React.createElement('button', {
                  className: 'mt-2 w-full text-center text-gray-500 hover:text-gray-700',
                  onClick: () => setTodoDropdown(null)
                }, 'Cancel')
              )
            )
          )
        ),
        
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('input', {
            type: 'text',
            value: newTodoText,
            onChange: (e) => setNewTodoText(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && addTodo(),
            placeholder: 'Add a new to-do item...',
            className: 'flex-1 px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500'
          }),
          React.createElement('button', {
            onClick: addTodo,
            className: 'bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-semibold'
          }, '➕ Add')
        )
      ),

      React.createElement('div', { className: 'mt-8 bg-green-50 border-2 border-green-400 rounded-xl p-6' },
        React.createElement('h3', { className: 'text-xl font-bold text-green-800 mb-3' }, '💡 Tips for Using This Schedule:'),
        React.createElement('div', { className: 'space-y-2 text-green-900' },
          React.createElement('p', null, '✓ Your changes are automatically saved!'),
          React.createElement('p', null, '✓ Use the "See Whole Week" view to plan ahead'),
          React.createElement('p', null, '✓ Use "One Day at a Time" to focus on today'),
          React.createElement('p', null, '✓ Type to-do items into the green "Open" time slots'),
          React.createElement('p', null, '✓ Click ⚙️ Settings to customize your daily schedule'),
          React.createElement('p', null, '✓ Check off to-dos as you complete them')
        )
      ),
      
      React.createElement('div', { className: 'mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6' },
        React.createElement('h3', { className: 'text-xl font-bold text-yellow-800 mb-3' }, '📱 Device Pro Tip:'),
        React.createElement('div', { className: 'space-y-2 text-yellow-900' },
          React.createElement('p', null, '✓ Add this to your home screen for quick access!'),
          React.createElement('p', null, '✓ iPad/Safari: Tap Share → "Add to Home Screen"'),
          React.createElement('p', null, '✓ Android/Chrome: Menu (⋮) → "Add to Home screen"'),
          React.createElement('p', null, '✓ It will work like a regular app!')
        )
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(KidsSchedulePWA));
