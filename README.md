# CS663 Project 1 — Revised Website

Topic: **Computer Vision for Pet Behavior Monitoring and Restricted-Area Detection**

## Final page structure

1. `index.html` — Home / introduction
2. `tracking.html` — Detection & Tracking + interactive dog/cat photo detector
3. `restricted-area.html` — Restricted-area method + existing implementation + notebook-aligned code + video demo
4. `behavior.html` — Behavior Recognition
5. `limitations.html` — Challenges and Limitations
6. `demo.html` — Quiz only, with explanations for incorrect answers
7. `bibliography.html` — Annotated Bibliography

## Important: add your demo video

Copy your finished video into:

`videos/demo.mp4`

The Restricted Area page is already configured to play that file.

## Jupyter Notebook

The notebook used for the video demo is included at:

`notebooks/dog_restricted_area_demo.ipynb`

## Animal image detector

The interactive image detector is now on the **Detection & Tracking** page.
It uses TensorFlow.js COCO-SSD in the browser. It requires internet access the first time
the model/library is loaded.

## Voice requirement

Browser text-to-speech was removed.

The assignment says voice should be added to each individual page. If you still need to meet
that requirement, record short narration clips yourself. See `audio/README.txt`.

## GitHub Pages

Upload the contents of this folder to the root of your GitHub repository so that
`index.html` is at the top level.
