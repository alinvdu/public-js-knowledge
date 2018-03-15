@Author: Alin Vasile Dumitru.
@description:

**********************************************************************************************************************************************************
***********************************************************Design Patterns Knowledge**********************************************************************
**********************************************************************************************************************************************************

Classification:

1. Purpose
Creational - process of object creation. How object is made?
Structural - composition of classes or objects.
Behavioral - the way classes or object interact and distribute responsibility.

2. Scope - apply primarly to classes or object?

For instance: Creational class patterns defer some part of object creation to subclasses. | Factory Method.
              Creational object patterns defer it to another object. | Abstract Factory, Builder, Prototype, Singleton.
              Structural class patterns use inheritance to compose classes. | Adapter.
              Structural object patterns describe way to assemble object. | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.
              Behavioral class patterns use inheritance to describe algorithms and flow of control. | Interpreter, Template Method.
              Behavioral object patterns describe how a group of objects cooperate to perform a task that no single object can carry out. |
                Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Visitator.

* Inheritance ability to define families of objects with identical interfaces (inheriting from an abstract class) is important for polymorphism.
Distinction between interface inheritance and implementation inheritance:
    - interface inheritance has more to do with IS AN.
    - implementation inheritance has more to do with CAN DO.

*IMPORTANT* Decoupling subsystem can be achieved with the following in mind:
"Program to an interface, not an implementation." - don't declare variables to be instances of particular concrete classes. Commit only
to an interface defined by an abstract class. For instance it's easier to declare List myList = new ArrayList() rather than ArrayList = new ArrayList().
You only need some aspects of that list and furthermore you can say List myList = new ListTree().

*IMPORTANT* Reuseble Code - Class Inheritance vs Object Composition leads to:
"Favor object composition over class inheritance". - class inheritance "IS A". Object Composition - "HAS A". Of course both class inheritance and object
composition should be use - it's just a matter of WHAT should it be? If for instance there's no need for class inheritance just use composition.

Some disavantages of class inheritance:
- You can't change the implementation inherited from super classes at runtime.
- Inheritance exposes a subclass to details of its parent's class implementation, that's why it's often said that inheritance breaks encapsulation.
* The tight coupling provided by inheritance makes the implementation of a subclass very bound up with the implementation of a super class that any change
  in the parent implementation will force the sub class to change.

*NICE THING* DEsigning for Change. Refactoring is a big part of evey project.
Causes?

1. Creating an object by specifying a class explicitly. - Create Object indirectly - Factory Mehtod, Abstract Factory, Prototype.
2. Dependence on specific operations. - Avoid hard-coded requests - Chain of Responsibility, Command.
3. Tight coupling - hard to reuse a class if it's very dependent on many others. -> Abstract Coupling / layer to promote loosely coupled systems.
   Abstract Factory, Command, Facade, Mediator, Observer.
4. Inability to alter classes conveniently.
5. Extending functionality by subclassing.
6. Dependence on object representations or implementations. // Abstract Factory, Bridge, Memento, Proxy.


How to select a Design Pattern?
// to complete

How to use a design Pattern?
1. Read the pattern once through for an overview.
2. Go back and study the Structure, Participants, and Collaborations sections.
3. Look at the Sample Code section to see concerete example of the pattern in code.
4. Choose names for pattern participants that are meaningful in the app context.
5. define the classes.
// to complete

********************************************************************************************************************************************
**************************************************** 1. Creational Patterns ****************************************************************
********************************************************************************************************************************************

A1) Simple Factory Example

Simple factory simply generates an instance for client without exposing any instantiation logic to the client (generates an object with another object)
Simple Example:

// the interface exposes the public data for consuming
interface Door
{
    public function getWidth(): float;
    public function getHeight(): float;
}

class WoodenDoor implements Door
{
    protected $width;
    protected $height;

    public function __construct(float $width, float $height)
    {
        $this->width = $width;
        $this->height = $height;
    }

    public function getWidth(): float
    {
        return $this->width;
    }

    public function getHeight(): float
    {
        return $this->height;
    }
}

class DoorFactory
{
    // instantiation isn't exposed to the client. It usually holds logic around it for a given scope that the consumer shouldn't be aware of
    // like how to get materials for making the door or stuff like this
    public static function makeDoor($width, $height): Door
    {
        return new WoodenDoor($width, $height);
    }
}

When to Use?
// When creating an object is not just a few assignments and involves some logic, it makes sense to put it in a dedicated factory instead of repeating
// the same code everywhere.

A) Abstract Factory Pattern.
Intent: Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

** Applicability:
    1. A system should be independent of how its products are created, composed, and represented.
    2. A system should be configured with one of multiple families of products.
    3. A family of related product objects is designed to be used together, and you need to enforce this contraint.
    4. You want to prove a class library of products, and you want to reveal just their interfaces, not their implementations.

** Participants structure:
    * AbstractFactory (DoorFactory) (let's say it's an WidgetFactory) -> declares an interface for operations that create abstract product objects. (makes orders).
    * ConcreteFactory (WoodenDoorFactory) -> implements the operations to create concrete product objects. (what the order looks like).
    * AbstractProduct (Door / DoorFittingExpert) -> declares an interface for a type of product object. (it's like a second factory for specific Product that end up on the client).
    * ConcreteProduct (WoodenDoor / Carpenter) -> defines a product object to be created by the corresponding concrete factory.
                    -> implements the AbstractProduct interface.
                    eg. imagine making a Window that can have multiple feels-and-likes. Here you define Window that implements AbstractProduct (it doesn't have to
                    be an actual product), but ConcreteFactory uses ConcreteProduct to enchance the feeling. Let's say AdminWindow.

** Collaborations:
    - Single instance of ConcreteFactory class is created at runtime. It creates product objects having particular implementation.
    - AbstractFactory defers creation of product objects to its ConcreteFactory subclass.

!!Implementation of Abstract Factory Pattern is attached. (UFO examples is very nice!) Same for UML diagram.

** Consequences of Abstract Factory:
    1. It isolates concrete classes. (of course).
    2. It makes exchanging product families easy -> Since ConcreteFactory is only instantiated once its very easy to change with another ConcreteFactory.
    3. It promotes consistency among products.
    4. Supporting new kinds of products is difficult.

** Other things to know about Abstract Factory:
    - Factories are best implemented as a Singleton (since tehre only needs to be one ConcreteFactory per product family).
    - If many product families are possible, the concrete factory can be implemented using the Prototype pattern. The Prototype-based approach eliminates
    the need for a new concrete factory class for each new product family.

Example Door Building:

// Families of dependent objects: Types of door have types of expert who can build them
// interface for specifying operations the Door exposes, which is implemented by different classes
interface Door
{
    public function getDescription();
}

// concrete implementation of door
class WoodenDoor implements Door
{
    public function getDescription()
    {
        echo 'I am a wooden door';
    }
}

// another concrete implementation of door
class IronDoor implements Door
{
    public function getDescription()
    {
        echo 'I am an iron door';
    }
}

// related families of objects
// interface for specifying operations a door fitting expert can do
interface DoorFittingExpert
{
    public function getDescription();
}

// concrete implementation of door fitting expert
class Welder implements DoorFittingExpert
{
    public function getDescription()
    {
        echo 'I can only fit iron doors';
    }
}

// another concrete implementation of door fitting expert
class Carpenter implements DoorFittingExpert
{
    public function getDescription()
    {
        echo 'I can only fit wooden doors';
    }
}

// factories
// interface which specifies the set of operations and return type
interface DoorFactory
{
    public function makeDoor(): Door;
    public function makeFittingExpert(): DoorFittingExpert;
}

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory implements DoorFactory
{
    public function makeDoor(): Door
    {
        return new WoodenDoor();
    }

    public function makeFittingExpert(): DoorFittingExpert
    {
        return new Carpenter();
    }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory implements DoorFactory
{
    public function makeDoor(): Door
    {
        return new IronDoor();
    }

    public function makeFittingExpert(): DoorFittingExpert
    {
        return new Welder();
    }
}

// Usage
$woodenFactory = new WoodenDoorFactory();

$door = $woodenFactory->makeDoor();
$expert = $woodenFactory->makeFittingExpert();

$door->getDescription();  // Output: I am a wooden door
$expert->getDescription(); // Output: I can only fit wooden doors

// Same for Iron Factory
$ironFactory = new IronDoorFactory();

$door = $ironFactory->makeDoor();
$expert = $ironFactory->makeFittingExpert();

$door->getDescription();  // Output: I am an iron door
$expert->getDescription(); // Output: I can only fit iron doors

B) Factory method pattern

** Intent:
    Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation
    to subclasses.

** Aplicability - use this when:
    * Useful when there is some generic processing in a class but the required sub-class is dynamically decided at runtime. Or putting it in other words,
    when the client doesn't know what exact sub-class it might need.
    - a class can't anticipate the class of objects it must create.
    - a class wants its subclasses to specify the objects it creates.
    - classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.

** Participants structure:
    - Product (Interviewer interface)
        defines the interface of objects the factory method creates.
    - ConcreteProduct (Developer + CommunityExecutive)
        implements the Product interface.
    - Creator (HiringManager)
        - declares the factory method, which returns an object of type Product. Creator may also define a default implementation of the factory method
        that returns a default ConcreteProduct object.
        - may call the factory method to create a Product object.
    - ConcreteCreator (DevelopmentManager + MarketingManager)
        overrides the factory method to return an instance of a ConcreteProduct.

** Collaborations
    - Creator relies on its subclasses to define the factory method so that it returns an instance of the appropriate ConcreteProduct.

** Consequences:
    - Provides hooks for subclasses.
    - Connects parallel class hierarchies. -> happens  when a class delegates some of its responsibilities to a separate class.
        eg. Graphical figures that can be manipulated interactively: can be stretched, moved, rotated. Implementing such interactions requires sorting
        updating information that records the state of the manipulation. Manipulation can be kept in Figure object and each figure requires different
        manipulation sub-classes.

        eg. Check out the parallel class hiercarchies diagram attached.

** Issues to consider:
    - Two major varities
        1. -> Creator class is an abstract class and does not provide an implementation for the factory method it declares.
        2. -> Creator is a concrete class and provides a default implementation for the factory method.
            -> using factory method for flexibility. -> "Create objects in a separate operation so that subclasses can override the way they are created".
    - Parameterized factory methods. - another variation on the pattern -> let's factory method create multiple kinds of products. Takes parameter that
      identifies the kind of object to create.

            eg. Unidraw graphical editing framework uses this approach for reconstructing objects saved on disk. Unidraw defines a Creator class with a
                factory method Create that takes a class identifier as an argument. -> Writes/Reads class identifier and then its instance variables.
    - Naming conventions.

Example Interviewer:

// interface which specifies what kind of functionality interviwer exposes
interface Interviewer
{
    public function askQuestions();
}

// the subclass which is dynamically called at runtime
class Developer implements Interviewer
{
    public function askQuestions()
    {
        echo 'Asking about design patterns!';
    }
}

// another subclass which can dinamically be called (substituted) at runtime
class CommunityExecutive implements Interviewer
{
    public function askQuestions()
    {
        echo 'Asking about community building';
    }
}

// actual factory abstract class. Specifies a function which returns a wanted subclass (Interviewer). It can be extended by different classes
// which implement the protected function
abstract class HiringManager
{

    // Factory method
    abstract protected function makeInterviewer(): Interviewer;

    public function takeInterview()
    {
        $interviewer = $this->makeInterviewer();
        $interviewer->askQuestions();
    }
}

// example of abstract class extension
class DevelopmentManager extends HiringManager
{
    protected function makeInterviewer(): Interviewer
    {
        return new Developer();
    }
}

// Eg. 2 for the second subclass
class MarketingManager extends HiringManager
{
    protected function makeInterviewer(): Interviewer
    {
        return new CommunityExecutive();
    }
}

// Usage
$devManager = new DevelopmentManager();
$devManager->takeInterview(); // Output: Asking about design patterns

$marketingManager = new MarketingManager();
$marketingManager->takeInterview(); // Output: Asking about community building.

C) Builder
Intent: Separate the construction of a complex object from its representation so that the same construction process can create different
representations.

Allows you to create different flavors of an object while avoiding constructor pollution (solves telescoping constructor anti-pattern)

** Applicability:
    1. The algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled.
    2. The construction process must allow different representations for the object that's constructed.

** Participants structure:
    - Builder -> specifies an abstract interface for creating parts of a Product object.
    - ConcreteBuilder -> constructs and assembles parts of the product by implementing the Builder interface.
                    -> defines and keeps track of the representation it creates.
                    -> provides an interface for retrieving the product.
    - Director -> constructs an object using the Builder interface.
    - Product -> represents the complex object under construction. ConcreteBuilder builds the products internal representation and defines
                the process by which it's assembled.
            -> includes classes that define the constituent parts, including interfaces for aseembling the parts into the final result.

** Collaborations:
    - The client creates the Director object and configures it with the desired Builder object.
    - Director notifies the builder whenever a part of the product should be build.
    - Builder handles requests from the director and adds parts to the product.
    - The client retrieves the product from the builder.

** Consequences of Builder Pattern:
    - It lets you vary a products internal representation.
    - It isolates code for construction and representation. -> Each Concretebuilder contains all the code to create and aseemble a particular kind of
      product
    - It gives you finer control over the construction process. -> reflects more the process of constructing the product.

** Implementation issue to consider:
    * Assembley and construction interface -> builders construct their product in step-by-step fashion! Sometimes you might need access to
      parts of the product constructed earlier.
    - Solution: The builder would return child nodes to the director, pass then to the builder to build the parent nodes.
    * Why no abstract class for products? Don't really need one, they have little in common.
    * Empty methods as default in Builder.

Example Parsing a file to table:

class Table {
    private width;
    private height;
    private cell;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setCell(cell) {}
    setStartRow(startRow) {}
}

// abstract interface for creating parts of Product object (Table in this case)
interface Builder {
    protected setWidthAndHeight(width, height);
    protected startRow();
    protected buildCell(value);
    Component getResults();
}

// defines a simple table
class TableBuilder implements Builder {
    private Table table;
    private rowStart;
    
    // constructor call
    public setWidthAndHeight(width, height) {
        table = new Table(width, height);
    }

    public startRow() {
        rowStart = computeRowStart();
        table.setStartRow(rowStart);
    }

    public buildCell(value) {
        table.setCell(new Cell(x++, y, value));
    }

    public Table getResult() {
        return table;
    }
}

// defines a different table which uses autoSizer for a different representation
class AutoSizeTableBuilder implements Builder {
    private Table table;
    private AutoSizer autoSizer;

    public setWidthAndHeight() {
        autoSizer = new AutoSizer();
        table = new Table(autoSizer.getWidth(), autoSizer.getHeight());
    }

    public startRow() {
        rowStart = autoSizer.computeRowStart();
        table.setStartRow(rowStart);
    }

    public buildCell(value) {
        table.setCell(new Cell(x++, y, value));
    }

    public Table getResult() {
        return table;
    }
}

class TableDirector() {
    private Builder builder;

    constructor(b) {
        this.builder = b;
    }

    public make(fileName) {
        // read file here
        // read width and height from file
        -> width, height
        builder.setWidthAndHeight(width, height);

        // read cells
        -> values.forEach -> value
        -> builder.buildCell(value);

        builder.startRow();
    }
}

// use them
director = new TableDirector(new Builder()); // choose builder type instead

// get file -> file
director.make(file)
Component comp = director.getTable().getResult();


D) Prototype Pattern

** Intent
    - Specify the kinds of object to create using a prototypical instance, and create new objects by copying this prototype.
    - Prototype pattern refers to creating duplicate object while keeping performance in mind.

** Applicability
    - when the classes to instantiate are specified at run-time, for example, by dynamic loading.
    - to avoid building a class hierarchy of factories that parallels the class hierarchy of products.
    - when instances of a class can have one of only a few different combinations of state. It may be more convenient to install a coresponding number
      of prototypes and clone them rather than instantiating the class manually.

** Participants
    - Prototype
        declares an interface for cloning itself.
    - ConcretePrototype
        implements an operation for cloning itself.
    - Client
        creates a new object by asking a prototype to clone itself.

** Collaborations
    - A client asks a prototype to clone itself.

** Consequences
    Consequences are similar as for Abstract Factory * Builder.
    * Adding and removing products at run-time. -> Prototypes let you incorporate a new concrete product class into a system simply by registering a
      prototypical instance with the client.
    * Specifying new objects by varying structure.
        -> Prototype pattern supports adding sub-parts as a prototype to the already available subparts.
    * Reduced subclassing.

** Considering issues when implementing:
    - Using a prototype manager. -> number of prototype too big is solved by keeping a register of available prototypes. (Prototype Manager / Store by key).
    - Implementing the Clone operation. -> tricky when object structures contain circular references.
    - Initializing clones. -> initialization of internal state? Some client want to do that, some don't.

Example (prototype is straightforward)

interface Person {
    protected Person clone();
}

class Teacher implements Person {
    public Teacher clone() {
        return new Teacher();
        // set fields
    }
}

// or use create since javascript has build in prototype inheritance
// The Object.create() method creates a new object with the specified prototype object and properties

E) Singleton

** Intent
    Ensure a class only has one instance, and provide a global point of access to it.

** Applicability - When to use:
    - There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.
    - When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.

** Participants
    Singleton
        - defines an Instance operation that lets clients access its unique instance. Instance is a class operation.
        - may be responsible for creating its own unique instance.

** Collaborations
    - Clients access a Singleton instance solely through Singleton's Instance operation.

** Consequences
    * Controlled access to sole instance. -> Can have restrict control over how and when clients access it.
    * Reduced name space. -> It avoid polluting the name space with global variables that store sole instances.
    * Permits refinement of operations and representation. -> may be subclassed and it's easy to configure.
    * Permits a variable number of instances. -> easy to control how many instances to allow.

** Problems in implementation
    - Subclassing the Singleton class? How do you know what subclass it is using? Best solution is using REGISTRY OF SINGLETONS. Instead
      of having Instance define the set of possible Singleton classes, the Singleton classes can register their singleton instance by name in a
      well-known registry.

Simple Example

class Singleton {
    private static singleton: Singleton;

    public static getInstance(): Singleton {
        if (this.singleton == null) {
            this.singleton = new Singleton();
        }

        return this.singleton;
    }
}

********************************************************************************************************************************************
**************************************************** 2. Structural Patterns ****************************************************************
********************************************************************************************************************************************

A) Adapter

** Intent
    Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't othertwise because
    of incompatible interfaces.

** IMPORTANT Difference between Adapter and Bridge because they are very common to missunderstand
    Bridge has a different intent: It is meant to separate an interface from its implementation so that they can be varied easily.
    Adapter is meant to change the interface of an EXISTING object.

    -- only the intention differs. Usually use adapter when the code is already written.

** Applicability - when to use
    * You want to use an existing class, and its interface doesn not match the one you need.
    * You want to create reusable class that cooperates with unrelated or unforseen classes, that is, classes that don't necessarily have
    compatible interfaces.
    * (object adapter only) you need to use several existing subclasses, but it's impractical to adapt their interface by subclassing every one.
    An object adapter can adapt the interface of its parent class. (multiple adapter scenarios)

** Participants
    Target (interface)
        defines a domain-specific interface that Client uses.
    Client
        collaborates with objects conforming to the Target interface.
    Adaptee
        defines an existing interface that needs adapting.
    Adapter
        adapts the interface of Adaptee to the Target interface.

** Collaborations
    * Clients call operations on an adapter instance. In turn, the adapter calls Adaptee operations that carry out the request.

** Consequences
    * Class Adapter
        * adapts Adaptee to Target by comitting to a concrete Adapter class. As a consequence, a class adapter won't work when we want to adapt
        a class and all its subclasses.
        * let's Adapter override some of Adaptee's behavior, since Adapter is a subcass of Adaptee.
        * introduces only one object, and no additional pointer indirection is needed to get the adaptee. (since its extending the Target class you only
        have one object and that's it).

    * Object Adapter
        * lets a single Adapter work with many Adaptees - the Adaptee itself and all of its subclasses. The adapter can also add functionality to all
        Adaptees at once.
        * makes it harder to override Adaptee behavior. It will require subclassing Adaptee and making Adapter refer to the subclass rather than
        the Adaptee itself.

** Problems that occur in implementations and solutions:
    * Two way adapters

    Why ?
    Potential problem is that the Target interface only exposes certain operations. Where Adaptee object could be used there's no way to use the Adapter object,
    they are not interchangeable. We might have cases where we want to access the adaptee.

    Solution
    Two way adapters solves this issue by doing multiple inheritance which makes the adapter confirm to target and adaptee interfaces.

    * Pluggable adapters

    Why?
    Make the class more reusable

    Solution
    Pluggable adapters. Simply put: pluggable adapters lets us incorporate our class into existing systems that might expect different interfaces.

    Simple example of pluggable adapter pattern:

interface CoffeMaker {
    public Brew(q);
}

interface JuiceMaker() {
    public Squeeze(q);
}

interface Beverage {
    getBeverage(q) => Beverage
}

class Adapter implements Beverage {
    public request(quantity) => number;

    public Adapter(CoffeMaker c) {
        Request = (quantity) => c.Brew(quantity);
    }

    public Adapter(JuiceMaker j) {
        Request = (quantity) => j.Squeeze(quantity);
    }

    public getBeverage(quantity) => Request(quantity);
}

Adapter a1(new CoffeMaker());
a1.getBeverage(30);

Adapter a2(new JuiceMaker());
a2.getBeverage(40);

Example of Adapter pattern:

interface Shape {
    draw: (x, y, z, j) => void
}

class Line {
    draw (x1, y2, x2, y2) => void {
        Print(drawing line);
    }
}

class Rectangle {
    draw (x, y, width, height) {
        Print(drawing rectangle);
    }
}

class LineAdapter implements Shape {
    private Line adaptee;

    public LineAdapter(Line line) {
        this.adaptee = line;
    }

    public void draw(x1, y1, x2, y2) {
        adaptee.draw(x1, y1, x2, y2);
    }
}

class RectangleAdapter implements Shape {
    ... same as above
}

used it like:
Shape[] shapes = {
    new RectangleAdapter(new Rectangle()),
    new LineAdapter(new Line())
}

forEach(shapes: shape) {
    shape.draw(x1, y1, x2, y2);
}

B) Bridge

C) Composite
** Intent
    * Compose objects into tree structures to represent part-whole hiercarchies. Composite lets clients treat individual objects and compositions
    of objects uniformly by specifing an interface that they adhere to and the compositions of objects usually use recursion to implement the operations.

    * Part whole hierarchy - A system that consists of subsystems or components. Components can further be divided into smaller components and so on.

** Applicability
    * you want to represent part-whole hierarchies of objects.
    * you want clients to be able to ignore the difference between compositions of objects and individual objects. Clients will treat all objects in the
    composite structure uniformly.

** Participants
    * Component (Interface)
        - declares the interface for objects in the composition.
        - implements default behavior for the interface common to all casses, as appropriate.
        - declares an interface for accessing and managing its childs components.
        - (optional) defines an interface for accessing and managing its child components.
    
    * Leaf (represents the simple Object class)
        - represents leaf objects in the Composition. A leaf has no children.
        - defines behavior for primitive objects in the composition.
    
    * Composite
        - defines behavior for components having children.
        - stores child components.
        - implements child-related operations in the Component interface.

    * Client
        - manipulates objects in the composition through the Component interfaces.

** Collaborations
    * Clients use the Component class interface to interact with objects in the composite structure. If the recipient is a Leaf, then the request is handled
    directly. If the recipient is Composite, then it usually forwards requests to its child components, possibly performing additional operations before
    and/or after forwarding.

** Consequences
    * makes the client simple. Clients can treat composite structures and individual objects uniformly. Clients normally don't know and don't care with
    what exactly they are dealing (Leaf or Composite). Simplifies client code avoids to write cases or check types.

Example of Composite pattern:

// define a lowest common denominator
interface AbstractFile {
    ls: () => void;
}

// File implements the lowest common denominator
class File implements AbstractFile {
    private name: string;

    public File(name: string) {
        this.name = name;
    }

    public void ls() {
        // print out to screen the name
        printLn(name);
    }
}

class Directory implements AbstractFile {
    private name: string;
    private includedFiles: List = new List() of File;

    public Directory(name: string) {
        this.name = name;
    }

    public void add(File f) {
        includedFiles.add(f);
    }

    public void ls() {
        printLn("Printing directory");
        for (file in includedFiles) {
            file.printLn
        }
    }
}

// Use it
File f1 = new File("f1");
File f2 = new File("f2");

Directory d1 = new Directory('d1');
d1.add(f1, f2);

f1.ls();
f2.ls();
d1.ls();

D) DECORATOR

** Intent
    attach additional responsibilities to an object dynamically without altering its structure.
    Decorators provide a flexible alternative to subclassing extending functionality.

** Applicability
    Use decorator:
    - to add responsabilities to individual objects dynamically and transparently, that is, without affecting other objects.
    - for responsibilities that can be withdrawn.
    - when extension by subclassing is impractical. Sometimes a large number of independent extensions are possible and would produce an explosion of
    subclasses tu support every combination. Or a class definition may be hidden or otherwise unavailable for subclassing.

** Participants
    * Component
        - defines the interface for objects that can have responsibilities added to them dynamically.
    * ConcreteComponent
        - defines an object to wich additional responsibilities can be attached.
    * Decorator
        - mantains a reference to a Component object and defines an interface that conforms to Component interface.
    * ConcreteDecorator
        - adds responsibilities to the component.

** Collaborations
    * Decorator forwards requests to its Component object. It may optionally perform additional operations before or after.

** Consequences
    * More flexibility than static inheritance. Responsibilities can be added and remove dynamically, mix responsibilities and add properties twice.

** Issues to consider when implementing
    - Interface conformance. A decorator object's interface must conform to the interface of the component it decorates. ConcreteDecorator classes
    must therefore inherit from a common class. (not in all languages).
    - Keeping Component classes lightweight. To ensure a conforming interface, components and decorators must descend from a common Component class.
    It's important to keep this common class lightweight; it is, it should focus on defining an interface, not storing data. The definition of the data
    representation should be deferred to subclasses; otherwise the complexity of the Component class might make the decorators too heavyweight to use
    in quantity. Putting a lot of functionality into Component also increases the probability that concrete subclasses will pay for features they
    don't need.
    - Depending on how much logic the Component class holds, one must decide between decorator and strategy. Decorator is changing the skin of an object
    while the strategy it's changing its internals.

Simple example:

interface I {
    void doIt();
}

class A implements I {
    public void doIt() {
        // -> print A
    }
}

abstract class D implements I {
    private I core;
    
    public D(I inner) {
        core = inner;
    }

    public void doIt() {
        core.doIt();
    }
}

class X extends D {
    public X(I inner) {
        super(inner);
    }

    public void doIt() {
        super.doIt();
        doX();
    }

    public void doX() {
        // -> print X
    }
}

class Y extends D {
    public Y(I inner) {
        super(inner);
    }

    public void doIt() {
        super.doIt();
        doY();
    }

    private void doY() {
        // -> print Y
    }
}

public class DecoratorClient {
    I[] array = {new X(new A()), new Y(new A()), new X(new Y(new A()))};
    forEach -> print item->doIt() // AX, AY, AYX
}

E) Facade

** Intent
    * Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

** Applicability
    Use the Facade when:
    - you want to provide a simple interface to a complex subsystem. Subsystems often get more complex as they evolve. Most patterns, when applied, result
    in a more and smaller classes. Makes the system more reusable and easier to customize -> but it also becomes harder to use for clients that don't
    need to customize. A facade is provided to simplify.
    - you want to layer your sybsystems. Use a facade to define an entry point to each subsystem level. If subsystems are dependent, then you can
    simplify the dependencies between them by making them communicate with each other solely through their facades.

** Participants
    * Facade
        - knows which subsystem classes are responsible for a request.
        - delegates client requests to appropriate subsystem objects.

    ** subsystem classes
        - implement subsystem functionality.
        - handle work assigned by the Facade object.
        - have no knowledge of the facade; that is, they keep no references to it.

** Consequences
    Offers the following benefits:
    - it shields clients from subsystem components, thereby reducing the number of objects that clients deal with and making the subsystem easier to use.
    - it promotes weak coupling between the subsystem and its clients.
    - it doesnt prevent application from using subsystem classes if they need to. Thus you can choose between ease of use and generality.

** Implementation issue to consider
    * Reducing client-subsystem coupling. The coupling between clients and the subsystem can be reduced even further by making Facade an abstract class
    with concrete subclasses for different implementations of a subsystem. Then clients can communicate with the subsystem through the interface of the
    abstract Facade class.

    Or configure a Facade object with different subsystem objects.

Simple Facade pattern example:


class PointCartesian {
    private double x, y;

    public PointCartesian(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public void move(int x, int y) {
        this.x += x;
        this.y += y;
    }

    public String toString() {
        return toString(x, y);
    }
}

class PointPolar {
    private double radius, angle;

    public PointPolar(double radius, double angle) {
        this.radius = radius;
        this.angle = angle;
    }

    public void  rotate(int angle) {
        this.angle += angle % 360;
    }

    public String toString() {
        return "[" + radius + "@" + angle + "]";
    }
}

// implements desired interface move, rotate and puts together the whole subsystem to accomplish it task
// it uses PointCartesian and PointPolar to move, client only needs to specify and input (Point cartesian) and from there all it happens
// is behind the curtains (exposed by a facade).
class Point {
    private PointCartesian pointCartesian;

    public Point(double x, double y) {
        pointCartesian = new PointCartesian(x, y);
    }

    public String toString() {
        return pointCartesian.toString();
    }

    public void move(int x, int y) {
        pointCartesian.move(x, y);
    }

    // encapsulates some logic that include multiple classes, like a subsystem works
    public void rotate(int angle, Point o) {
        double x = pointCartesian.getX() - o.pointCartesian.getX();
        double y = pointCartesian.getY() - o.pointCartesian.getY();
        PointPolar pointPolar = new PointPolar(Math.sqrt(x * x + y * y),Math.atan2(y, x) * 180 / Math.PI);
        // 4. Wrapper maps
        pointPolar.rotate(angle);
        System.out.println("  PointPolar is " + pointPolar);
        String str = pointPolar.toString();
        int i = str.indexOf('@');
        double r = Double.parseDouble(str.substring(1, i));
        double a = Double.parseDouble(str.substring(i + 1, str.length() - 1));
        pointCartesian = new PointCartesian(r*Math.cos(a*Math.PI/180) + o.pointCartesian.getX(),
                r*Math.sin(a * Math.PI / 180) + o.pointCartesian.getY());
    }
}

class Line {
    private Point o, e;

    public Line(Point ori, Point end) {
        o = ori;
        e = end;
    }

    public void move (int x, int y) {
        o.move(x, y);
        e.move(x, y);
    }

    public String toString() {
        return "origin is" + o + "end is" + e;
    }
}

// use it
public class FacadeDemo {
    public static void main(String[] args) {
        // 3. Client uses the Facade
        Line lineA = new Line(new Point(2, 4), new Point(5, 7));
        lineA.move(-2, -4);
        System.out.println( "after move:  " + lineA );
        lineA.rotate(45);
        System.out.println( "after rotate: " + lineA );
        Line lineB = new Line( new Point(2, 1), new Point(2.866, 1.5));
        lineB.rotate(30);
        System.out.println("30 degrees to 60 degrees: " + lineB);
    }
}

F) Flyweight

** Intent
    * Use sharing to support large number of fine-grained objects efficiently.
    * a flyweight is a shared object that can be used in multiple contexts simultaneously.

** Motivation
    * simply to expensive to store so many objects, instead a flyweight is used. Flyweights cannot make distinction about the context in which they operate.
    Differentiates between instrinsic and extrinsic state.
    * Intrisic state is stored in the flyweight
    * Extrisic state depends on and varies with the flyweights context and therefore cant be shared.

** Applicability
    * an application uses a large number of objects.
    * Storage costs are high because of the sheer quantity of objects.
    * most object state can be made extrinsic.
    * many groups of objects can be replaced by relatively few shared objects once extrinsic state is removed.
    * the application doesnt depend on object identity. Since flyweight objects may be shared, identity tests will return true for conceptually
    different objects.

** Participants
    * Flyweight
        * declares an interface through which flyweights can receive and act on extrinsic state.

    * ConcreteFlyweight
        * implements the Flyweight interface and adds storage for intrinsic state, if any. A ConcreteFlyweight object must be sharable. Any state it
        stores must be intrinsic; that is, it must be independent of the ConcreteFlyweight objects context.

    * UnsharedConcreteFlyWeight
        * not all Flyweight subclasses need to be shared. The Flyweight interface enables sharing; it doesnt enforce it. Its common for UnsharedConcreteFlyweight
        objects to have ConcreteFlyWeight objects as children at some level in the flyweight object structure.

    * FlyweightFactory
        * creates and manages flyweight objects.
        * ensures that flyweights are shared properly. Whena  client requests a flyweight, the FlyweightFactory object supplies an existing instance
        or it creates one, if none exists.

    * Client
        * maintains a reference to flyweights.
        * computes or stores the extrinsic state of flyweights.

** Consequences
    * might introduce run-time costs associated with transferring, finding, and/or computing extrinsic state, however such costs are offset by space
    savings (memory).

** Problem to consider when implementing
    * Managing shared objects. Because objects are shared, clients should never instantiate them directly. -> FlyweightFactory.
    * Externalized (non shareable) state must be supplied by client.

Simple Example:

class Gazillion {
    private int row;

    public Gazillion(int row) {
        this.row = row;
        System.out.println("row" + this.row);
    }

    void reprot(int col) {
        System.out.println(" " + row + col);
    }
}

class Factory {
    private Gazillion[] pool;

    public Factory(int maxRows) {
        pool = new Gazillion[maxRows];
    }

    public Gazillion getFlyWeight(int row) {
        if (pool[row] == null) {
            pool[row] = new Gazillion(row);
        }

        return pool[row];
    }
}

// instead of creating a new object for each cell in the matrix we can re-use the row object for each cell in a row
// thus creating less memory by simply calling getFlyWeight method which acts like a singleton but divided
public class FlyweightDemo {
    ROWS = 6;
    COLS = 6;
    
    public static void main(String[] args) {
        Factory theFactory = new Factory(ROWS);

        for (i = o to ROWS)
            for (j = 0 to COLS) {
                theFactory.getFlyweight(i).report(j);
            }
    }
}

********************************************************************************************************************************************
**************************************************** 3. Behavioral Patterns ****************************************************************
********************************************************************************************************************************************

A) Observer

** Intent
    * Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and update automatically.

Motivation is fairly simple, communication without coupling.

** Applicability
    * When an abstraction has two aspects, one dependent on the other. Encapsulating these aspects in separate objects lets you vary and reuse them
    independently.
    * When a change to one object requires changing others, and you dont know how many objects need to be changed.
    * When an object should be able to notify other objects without making assumptions about who these objects are. In Other words, you dont want
    these objects tighylu coupled.

** Participants
    * Subject
        * knows its observers. Any number of Observer objects may observe a subject.
        * provides an interface for attaching and detaching Observer objects.

    * Observer
        * defines an updating interface for objects that should be notified of changes in a subject.

    * ConcreteSubject
        * stores state of interest to ConcreteObserver objects.
        * sends a notification to its observers when its state changes.

    * ConcreteObserver
        * maintains a reference to a ConcreteSubject object.
        * stores state that should stay consistent with the subjects.
        * implements the Observer updating interface to keep its state consistent with the subjects.

** Collaborations
    * ConcreteSubject notifies its observers whenever a change occurs that could make its observers state inconsistent with its own.
    * After being informed of a change in the concrete subject, a ConcreteObserver object may query the subject for information. ConcreteObserver
    uses this information to reconcicle its state.


** Consequences
    * Abstract coupling between Subject and Observer. All a subject knows is that it has a list of observers, each conforming to the simple interface
    of the abstract Observer class. The subject doesnt know the concrete class of any observer.
    * Support for broadcast communication. Unlike an ordinary request, the notification that a subject sends isnt specific to the receiver. The
    notification is broadcast automatically to all interested objects that subscribed to it. Gives the freedom to add and remove observers.
    * Unexpected updates. Because observers have no knowledge of each others presence, they can be blind to the ultimate cost of changing the subject.
    A seemingly innocuous operation on the subject may cause a cascade of updates to observers and their dependent objects. Moreover, dependency
    criteria that arent well-defined or maintained usually lead to spurious updates, which can be hard to track down.

B) Strategy

** Intent
    * Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from the
    clients that use it.
    * Capture the abstraction in an interface, bury implementation details in derived classes.

Encapsulate interface details in a base class, and burry implementation details in derived classes. Clients can then couple themselves to an
interface, and do not have to experience the changes: no impact when the number of derived classes changes, and no impact when the implementation of
derived class changes.

** Participants
    * Strategy
        * declares an interface common to all supported algorithms. Context uses this interface to call the algorithm defined by ConcreteStrategy.
    * ConcreteStrategy
        * implements the algorithm using the Strategy interface.
    * Context
        * is configured with a ConcreteStrategy object.
        * maintains a reference to a Strategy object.
        * may define an interface that lets Strategy access its data.

Example:

interface IBillingStrategy {
    double getActPrice(double rawPrice);
}

class NormalStrategy: IBillingStrategy {
    public double getActPrice(double rawPrice) {
        return rawPrice;
    }
}

class HappyHourStrategy : IBillingStrategy {
    public double getActPrice(double rawPrice) {
        return rawPrice * 0.5;
    }
}

class Customer { // Context
    public IBillingStrategy Strategy;

    public Customer(IBillingStrategy strategy) {
        this.Strategy = strategy;
    }

    public void Add(double price, int quantity) {
        drinks.Add(Strategy.getActPrice(price * quantity));
    }
}

// chose strategy in main
Customer firstCustomer = new Customer(new NormalStrategy);
Customer secondCustomer = new Customer(new HappyHourStrategy);
firstCustomer.strategy = new HappyHourStrategy();

C) Template
** Intent
    * Define the skeleton of an algorithm in an operation, deferring some steps to client subclasses. Template method lets subclasses redefine
    certain steps without changing the algorithm structure.
    * Base class declares algorithm placeholders, and derived classes implement the placeholders.

The template method defines a skeleton of an algorithm in an operation, and defers some steps to subclasses.

** Participants
    * AbstractClass
        * defines abstract primitive operations that concrete subclasses define to implement steps of an algorithm.
        * implements a template method defining the skeleton of an algorithm. The template method calls primitive operations as welll as
        operations defined in AbstractClass or those of other objects.

    * ConcreteClass
        * implements the primitive operations to carry out subclass - specific steps of the algorithm.

* Template VS Strategy patterns. The main difference between the two is the fact that Strategy is decided at run-time by context while Template is decided at
compile time.

Simple Example:

abstract class Generalization {
    void findSolution() {
        stepOne();
        stepTwo();
    }

    void stepOne() {
        System.out.printLn("This is step one!");
    }
}

abstract class Specialization extends Generalization {
    void stepTwo() {
        System.out.printLn("This is step two");
    }
}

public static void main(String[] args) {
    Generalization algorithm = new Specialization();
    algorithm.findSolution();
}
