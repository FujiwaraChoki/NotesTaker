import g4f
import sqlite3
import speech_recognition as sr

from termcolor import colored

class NotesTaker:
  def __init__(self, model="gpt_4", lang="de-CH"):
    self._recognizer = sr.Recognizer()
    self._listening = False
    self._current_lesson = []
    self._model = model
    self._lang = lang
    self._STOP_TRIGGER = "stopp" if self._lang.lower().startswith("de") else "stop"

    # Create database
    conn = sqlite3.connect("classes.db", check_same_thread=False)
    c = conn.cursor()

    c.execute("""CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transcript TEXT NOT NULL,
      summary TEXT NOT NULL,
      date TEXT NOT NULL
    )""")

    conn.commit()

    self._conn = conn
    self._c = c

  @property
  def recognizer(self):
    return self._recognizer

  @property
  def listening(self):
    return self._listening
  
  @property
  def current_lesson(self):
    return self._current_lesson
  
  @property
  def lang(self):
    return self._lang
  
  @property
  def model(self):
    return self._model
    
  @property
  def STOP_TRIGGER(self):
    return self._STOP_TRIGGER
  
  @lang.setter
  def lang(self, value):
    self._lang = value
    self._STOP_TRIGGER = "stopp" if self._lang.lower().startswith("de") else "stop"

  @model.setter
  def model(self, value):
    self._model = value
  
  @listening.setter
  def listening(self, value):
    self._listening = value

  def execute_query(self, query, args=()):
    self._c.execute(query, args)
    self._conn.commit()
    return self._c.fetchall()
  
  def save(self, transcript, summary):
    self.execute_query("INSERT INTO classes (transcript, summary, date) VALUES (?, ?, datetime('now'))", (transcript, summary))

  def get_by_id(self, id):
    return self.execute_query("SELECT * FROM classes WHERE id=?", (id,))

  def get_all(self):
    return self.execute_query("SELECT * FROM classes")

  def find_model(self, model_name):
    model_name = model_name.lower()
    if model_name == "gpt_4":
      return g4f.models.gpt_4
    elif model_name == "mistral":
      return g4f.models.mistral_7b
    elif model_name == "llama_13b":
      return g4f.models.llama2_13b
    elif model_name == "llama_70b":
      return g4f.models.llama2_70b
    elif model_name == "claude_2":
      return g4f.models.claude_v2
    else:
      return g4f.models.gpt_35_turbo_16k_0613

  def listen(self):
    if self._listening:
      return
    
    self.listening = True

    while self.listening:
      with sr.Microphone() as source:
        print(colored("[*] Listening...", "magenta"))
        audio = self.recognizer.listen(source)
        try:
          text = self.recognizer.recognize_google(audio, language=self.lang)
          print(colored(f"[+] \"{text}\"", "green"))
          if text:
            if text.lower() == self.STOP_TRIGGER or text.lower().startswith(self.STOP_TRIGGER):
              print(colored("[*] Stopping...", "blue"))
              self.stop()
            else:
              self.current_lesson.append(text)
        except:
          print(colored("[-] Sorry, I didn't get that.", "red"))

  def stop(self):
    self.listening = False

  def summarize(self):
    text = ", ".join(self.current_lesson)

    print(colored("[*] Summarizing...", "magenta"))

    prompt = f"Please summarize the following Text in Markdown format:\n\n{text}"

    mdl = self.find_model(self.model)

    response = g4f.ChatCompletion.create(
      model=mdl,
      messages=[
        {
          "role": "user",
          "content": prompt
        }
      ]
    )

    if not response:
      return "Sorry, I didn't get that."
        
    self.save(text, str(response))
    
    return str(response)
