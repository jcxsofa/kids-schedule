const { useState, useEffect } = React;

const KidsSchedulePWA = () => {
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
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('kidsTodos') || '[]');
    const savedSlots = JSON.parse(localStorage.getItem('kidsFlexibleSlots') || '{}');
    
    if (savedTodos.length > 0) setTodos(savedTodos);
    if (Object.keys(savedSlots).length > 0) setFlexibleSlots(savedSlots);
  }, []);

  useEffect(() => {
    localStorage.setItem('kidsTodos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('kidsFlexibleSlots', JSON.stringify(flexibleSlots));
  }, [flexibleSlots]);

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

  const weekSchedule = {
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
      flexible: 'bg-green-50 border-2 border-dashed border-green-500'
    };
    return colors[type] || 'bg-gray-100';
  };

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-4 md:p-8' },
    React.createElement('div', { className: 'max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-4xl md:text-5xl font-bold text-purple-600 mb-2' }, '📅 My Weekly Schedule'),
        React.createElement('p', { className: 'text-gray-600 text-lg' }, 'Each day is different - here\'s what happens!')
      ),
      
      React.createElement('div', { className: 'bg-yellow-50 border-4 border-dashed border-yellow-400 rounded-2xl p-6 mb-8' },
        React.createElement('h2', { className: 'text-2xl font-bold text-purple-600 mb-2' }, '📝 This Week\'s To-Do Items'),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Check them off when done, or fill them into the open time slots!'),
        
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-3 mb-4' },
          todos.map(todo =>
            React.createElement('div', { key: todo.id, className: 'bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow' },
              React.createElement('button', { onClick: () => toggleTodo(todo.id), className: 'flex-shrink-0' },
                todo.completed ? '✅' : '⬜'
              ),
              React.createElement('span', { className: todo.completed ? 'flex-1 line-through text-gray-400' : 'flex-1 text-gray-800' }, todo.text),
              React.createElement('button', { onClick: () => deleteTodo(todo.id), className: 'text-red-500 hover:text-red-700' }, '🗑️')
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
      
      view === 'grid' && React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' },
        Object.entries(weekSchedule).map(([day, activities]) =>
          React.createElement('div', { key: day, className: 'bg-gray-50 rounded-xl p-4 shadow-md' },
            React.createElement('div', { className: `${day === 'sat' || day === 'sun' ? 'bg-green-500' : 'bg-purple-600'} text-white p-3 rounded-lg text-center font-bold text-lg mb-4` }, dayNames[day]),
            activities.map((item, idx) =>
              React.createElement('div', { key: idx, className: `${getActivityColor(item.type)} p-3 mb-2 rounded-lg` },
                React.createElement('div', { className: 'font-bold text-purple-700 text-sm' }, item.time),
                React.createElement('div', { className: 'text-sm mt-1' },
                  item.type === 'flexible' 
                    ? React.createElement('input', {
                        type: 'text',
                        value: flexibleSlots[item.key] || '',
                        onChange: (e) => updateFlexibleSlot(item.key, e.target.value),
                        placeholder: 'Type a to-do here...',
                        className: 'w-full bg-white border border-green-400 rounded px-2 py-1 text-xs focus:outline-none focus:border-green-600'
                      })
                    : item.activity
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
            React.createElement('div', { key: idx, className: `${getActivityColor(item.type)} p-4 rounded-xl flex items-center gap-4` },
              React.createElement('div', { className: 'font-bold text-purple-700 min-w-[140px]' }, item.time),
              React.createElement('div', { className: 'flex-1' },
                item.type === 'flexible'
                  ? React.createElement('input', {
                      type: 'text',
                      value: flexibleSlots[item.key] || '',
                      onChange: (e) => updateFlexibleSlot(item.key, e.target.value),
                      placeholder: 'Type a to-do item here...',
                      className: 'w-full bg-white border-2 border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600'
                    })
                  : React.createElement('div', { className: 'text-lg' }, item.activity)
              )
            )
          )
        )
      ),
      
      React.createElement('div', { className: 'mt-8 bg-green-50 border-2 border-green-400 rounded-xl p-6' },
        React.createElement('h3', { className: 'text-xl font-bold text-green-800 mb-3' }, '💡 Tips for Using This Schedule:'),
        React.createElement('div', { className: 'space-y-2 text-green-900' },
          React.createElement('p', null, '✓ Your changes are automatically saved!'),
          React.createElement('p', null, '✓ Use the "See Whole Week" view to plan ahead'),
          React.createElement('p', null, '✓ Use "One Day at a Time" to focus on today'),
          React.createElement('p', null, '✓ Type to-do items into the green "Open" time slots'),
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

ReactDOM.render(React.createElement(KidsSchedulePWA), document.getElementById('root'));
