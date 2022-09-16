**Scientific Programming with Python: Assignment Grading Template**

**Minh Truong, Abanoub Abdelmalak and Karl N. Kirschner, Ph.D.**

Department of Computer Science<br>
University of Applied Sciences Bonn-Rhein-Sieg<br>
Grantham-Allee 20, 54757 Sankt Augustin, Germany

---

This repository contains the HTML and JSON documents needed for grading the course Scientific Programming with Python given at the University of Applied Sciences Bonn-Rhein-Sieg. The HTML document can be given to grading helpers for their evaluation of homework assignments. When they open it on their local browser, the content, given as JSON files, should be downloaded from this repository automatically.

**Content**
- `grading_template_json.html`file: the HTML document that generates the web page. One can use the set `const debug = true` and copy-and-paste json contents below it to develop ideas locally, prior to pushing it GitHub (which makes things faster).
-  `references.json` file: the main JSON file that will link to the other json files within the criteria` folder
- `criteria` folder: contains json files developed for specific library/assignment specific feedback

**Usage**: Graders should open the HTML document (e.g. `firefox grading_template_json.html`), and click on the feedback items that are appropriate. At the end of the document, there is a `Generate` button, which will take the clicked items and compile the text into the bottom window. One can then copy-and-paste the feedback as desired. Upon a new feedback (i.e. another student's solution), click the `Reset` button at the top. The floating `Grading` window is just for personal point tallying, and doesn't currently contribute to the compiling via the `Generate` button.

**Modifying**: The following information is for those who want to use this as a template in their own courses. You will need to modify the links link in the following files to reflect your own repository and `criteria` json files:
 - the `references.json` file contains multiple links to this GitHub repository
 - the `grading_template_json.html` file contains one link to this GitHub repository
 - the folder `criteria` contains the feedback a) suitable for all assignments (`general.json`) and specific library/assignments (*.json)

**Browsers Tested**: Mozilla Firefox and Chrome

**Partial Funding**: HEP 3 Funding Program for Open Educational Resources

**Contribution**
1. Karl N. Kirschner - template conceptualization, feedback content and maintenance
2. Abanoub Abdelmalak - template conceptualization and HTML prototyping
3. Minh Truong - conceptualization and coding JSON components
