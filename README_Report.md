# Assignment 3 report
Currently in the scripts folder, our project has one script file. habit.js handles username
storage, themes, importing of habits, rendering and updating the dashboard, and tracking.
Responsibilities can become mixed with this system as logic for everything within the same script
is inefficient.

<img width="885" height="630" alt="StructureDiagram" src="https://github.com/user-attachments/assets/86c5480b-ca8d-4103-93f2-e40e62f611c5" />

A future modular ES6 design for this project could separate storage, business logic, and user interaction
into distinct files so each part has one clear job and the code overall could be more easily maintained.
One module could be HabitStore.js, responsible only for reading and writing data such as habits, username,
theme, and weekly statistics from localStorage. Functions like getHabits(), saveHabits(), getUsername(),
and saveTheme() would make sense to include in this module. A second module could be HabitService.js,
responsible only for application logic such as creating a habit, toggling scheduled days, calculating
streaks, updating completion history, and applying daily or weekly reset rules; it would expose functions
like createHabit(), toggleHabitCompletion(), toggleScheduledDay(), calculateStreak(), and resetForNewDay().
A third module could be HabitRenderer.js, responsible only for displaying data in the page; it would use
functions like renderHabitGrid(), renderDailyDashboard(), renderWeeklyProgress(), and renderWelcome() to do
all rendering responsibilities for the web page. Other modules that could be added could be modules for
importing and initialization could be useful.

Modular Refactored Diagram:

<img width="702" height="561" alt="ModularDiagram" src="https://github.com/user-attachments/assets/6f1d9f5a-9463-4954-8b94-a4586152c5d4" />

habitData.js
- Handles habit data validation and import workflows.
- Moved JSON validation logic out of habit.js into a dedicated data module.
- Moved default startup load from habit.json into a reusable function.
- Replaced inline FileReader/import flow in habit.js with async helper-based import.
- Validates that imported data is a non-empty array with required fields with validateHabits(data) function.
- Loads defaults from habit.json when no habits are stored with loadInitialHabits() function.
- Reads, parses, validates, merges, and saves imported habits with importHabitsFromFile(file) function.

habitStore.js
- Centralizes all localStorage access for app state.
- Removed repeated localStorage get/set code from habit.js.
- Added one key map for consistent storage across the app.
- Added helpers to standardize JSON parsing behavior.
- Read and write habit collection with getHabits() and saveHabits(habits) functions.
- Read and write username with getUsername and saveUsername(username) funcitons.
- Read and write selected theme with getTheme() and saveTheme(theme) functions.
- Read and write daily reset marker with getLastDate() and saveLastDate(date) functions.
- Read and write weekly reset marker with getLastWeekStart() and saveLastWeekStart(date) functions.
- Read and write weekly completed counter with getWeeklyCompletedTotal() and saveWeeklyCompletedTotal(total) functions.
- Read and write weekly history with getWeeklyHistory and saveWeeklyHistory(history) functions.
- Shared storage key constants with STORAGE_KEYS.
