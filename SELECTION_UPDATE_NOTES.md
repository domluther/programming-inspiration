# Selection Page Updates

## Overview
The selection page has been updated to support two types of selection questions:
1. **String equality questions** (original) - using `==` operator with string inputs
2. **Integer comparison questions** (new) - using comparison operators (`<`, `>`, `<=`, `>=`) with integer inputs

## Changes Made

### 1. Added 10 New Integer Comparison Questions
All questions include scenarios that require integer input and comparison operators:

1. **Age check** - `if age < 18:` → "You are young" else "You are old"
2. **Temperature check** - `if temperature > 20:` → "It is warm today" else "It is cold today"
3. **Exam score** - `if score >= 50:` → "Well done! You passed" else "Sorry, you failed"
4. **Height restriction** - `if height < 140:` → "You are too short for this ride" else "You can go on the ride"
5. **Speed limit** - `if speed > 30:` → "You were speeding!" else "You were within the speed limit"
6. **Bank balance** - `if balance >= 0:` → "You have money" else "You are overdrawn"
7. **Study hours** - `if hours < 5:` → "You need to study more" else "Good job studying!"
8. **Screen time** - `if screen_time <= 3:` → "That is a reasonable amount" else "That is too much screen time"
9. **Step goal** - `if steps < 10000:` → "You did not reach your goal" else "Great job! You reached your goal"
10. **Budget check** - `if price <= 100:` → "You can afford it" else "It is too expensive"

### 2. Updated Question Structure
Each question now includes a `pattern` field:
- `pattern: 'string'` - for string equality questions (all existing questions)
- `pattern: 'int'` - for integer comparison questions (new questions)

Integer questions also include:
- `operator` field - specifies the comparison operator (`<`, `>`, `<=`, `>=`)
- Numeric values for `answer1` and `answer2` (without quotes)

### 3. Updated SelectionPage Class

#### setCode() method changes:
- Detects the question pattern
- For `int` pattern:
  - Uses `int(input(...))` for user input
  - Assigns numeric values without quotes (e.g., `age_limit = 18`)
  - Uses comparison operators in the if condition (e.g., `if age < age_limit:`)
- For `string` pattern:
  - Uses regular `input(...)` for user input
  - Assigns string values with quotes (e.g., `correct_answer = "london"`)
  - Uses equality operator in the if condition (e.g., `if city == correct_answer:`)

#### setCaptions() method changes:
- Added pattern detection for future enhancements
- Maintains backward compatibility with existing string questions

## Example Code Generation

### Integer Comparison (Age Question):
```python
age_limit = 18
age = int(input("How old are you? "))
if age < age_limit:
    print("You are young")
else:
    print("You are old")
```

### String Equality (TV Show Question):
```python
correct_answer = "spongebob squarepants"
best_show = input("What is the best TV show? ")
if best_show == correct_answer:
    print("Absolutely! spongebob squarepants is glorious")
else:
    print("stranger things?!?! No way - it is spongebob squarepants")
```

## Testing
The page has been updated to randomly select from all questions (both string and integer types), providing variety in practice exercises for students.

Students will now practice:
- String comparison with `==`
- Integer casting with `int()`
- Various comparison operators (`<`, `>`, `<=`, `>=`)
- If/else selection logic
