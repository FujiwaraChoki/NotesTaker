# NotesTaker

Let NotesTaker AI take notes for you during class, so you can focus on understanding what
the teacher/professor is saying, and get a clean, organized and easy to read summary at the end.

## Installation

### Manually

1. Clone the repo

```sh
git clone https://github.com/FujiwaraChoki/NotesTaker.git && cd NotesTaker
```

2. Install node packages in `frontend/` & run frontend:

```sh
cd frontend
yarn
yarn dev
```

3. Install pip packages in `backend/` & run backend:

```sh
cd ../backend
pip install -r requirements.txt
python app.py
```

### With Script

1. Clone the repo

```sh
git clone https://github.com/FujiwaraChoki/NotesTaker.git && cd NotesTaker
```

2. Give `start.sh` executable permissions:

```sh
chmod +x start.sh
```

3. Run `start.sh`:

```sh
./start.sh
```

## Usage

1. Open `localhost:3000` in your browser
2. Press Record
3. Start speaking or let the teacher/professor speak
4. Once you lecture is over, simply say "stop"
5. Wait for the AI to process your audio
6. Refresh the page
7. Click on the lecture you just recorded
8. Enjoy your notes!

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire,
and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing_feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing_feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
