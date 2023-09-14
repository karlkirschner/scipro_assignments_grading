**Scientific Programming with Python: Assignment Peer Feedback/Grading Template**

**Minh Truong, Erik Autenrieth, Abanoub Abdelmalak and Karl N. Kirschner, Ph.D.**

Department of Computer Science<br>
University of Applied Sciences Bonn-Rhein-Sieg<br>
Grantham-Allee 20, 54757 Sankt Augustin, Germany

---

This repository contains the HTML and JSON documents needed for providing feedback for the course Scientific Programming with Python given at the University of Applied Sciences Bonn-Rhein-Sieg. The HTML document can be given to students for giving peer feedback, or to graders for their evaluation of homework assignments. A grader can either 1) use the form directly on GitHub (https://karlkirschner.github.io/scipro_assignments_grading/), or clone and open the index.html file on their local browser (note: the content, given as JSON files, should be automatically grabbed from this repository).

**Content**
- `index.html`file: the HTML document that generates the web page. One can use the set `const debug = true` and copy-and-paste json contents below it to develop ideas locally, prior to pushing to GitHub (which makes things faster).
-  `references.json` file: the main JSON file that will link to the other json files within the criteria folder
- `criteria` folder: contains json files developed for specific library/assignment-specific feedback
- `functions` folder: javascript files that are needed for the webpage

**Student Usage**: Students who give peer feedback should file in the ID of the student whose work they are critiquing, fill out the form as appropriate, and then save the json and txt files. A saved json file will allow you to continue working on feedback at a later time if needed.

**Grader Usage**: Graders should open the HTML document (e.g., `firefox index.html`), and click on the feedback items that are appropriate. At the end of the document, there is a `Generate` button, which will take the clicked items and compile the text into the bottom window. One can then copy-and-paste the feedback as desired. One can also save the form as a json and txt file. The json file can be given to the principle instructor, while the text files can be given to the students themselves (for example). Upon a new feedback (i.e. another student's solution), click the `Reset` button at the top. The floating `Grading` window can be used to tally the student's grade as you work through their assignment solution.

**Modifying**: The following information is for those who want to use this as a template in their own courses. You will need to modify the links link in the following files to reflect your own repository and `criteria` json files:
 - the `references.json` file contains multiple links to this GitHub repository
 - the `grading_template_json.html` file contains one link to this GitHub repository
 - the folder `criteria` contains the feedback a) suitable for all assignments (`general.json`) and b) specific library/assignments (*.json)

**Browsers Tested**: Mozilla Firefox and Chrome

**Partial Funding**: HEP 3 Funding Program for Open Educational Resources

**Contribution**
1. Karl N. Kirschner - template conceptualization, feedback content and maintenance
2. Abanoub Abdelmalak - template conceptualization and HTML prototyping
3. Minh Truong - conceptualization and coding JSON components
4. Erik Autenrieth - conceptualization and coding JSON components
